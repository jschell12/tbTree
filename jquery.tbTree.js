(function($){
    /* private fields */
    var _depth = 0;
    var _options = null;
    var _isFirstRun = true;
    var _self = null;
    
    /* public functions */
    getOptions = function(){
        return _options;
    };
    getDepth = function(){
        return _depth;
    };        
    
    $.fn.extend({
        tbTree: function(options) {
            var defaults = {
				truncate: 15,
                treeLayout: {},
                preToggle: function(e){},
                postToggle: function(e){},
            };
            _options =  $.extend(defaults, options);
            _self = this;
            
            _self.getOptions = getOptions;        
            _self.getDepth = getDepth;        
            _init();
            
            return this.each(function() {
                var o = _options;
            });
        }
    });
    
    /* private functions */    
    function _init(){
        _isFirstRun = true;
        var $ul = $("<ul class='tbTree-connectable nav nav-list'></ul>");
        var level = 0;//first level
        _parseJson(_options.treeLayout, $ul, 0);
        $(_self).append($ul);    
        _calculateDepth();        
        _bindEvents();    
        
        $(_self).find(".tbTree-toggle").click();   
        $(_self).find("li > .nav").hide();
        _isFirstRun = false;
		
		//apply drag and drop sorting
		$( ".tbTree-connectable, .tbTree-connectable" ).sortable({
            connectWith: ".tbTree-connectable"
        }).disableSelection();
    }

    function _bindEvents(){        
        //toggle click event
        $(_self).find(".tbTree-toggle").click(function(e){            
            _handleToggle(e, this);                            
        });
    }
    
    function _handleToggle(e, elem){
        var $elem = $(elem);
        var level = $elem.data("level");
        var label = $elem.data("label");
        var childrenCount = $elem.data("childrenCount");
        
        //handle pre toggle event
        if (_options.preToggle !== undefined && !_isFirstRun) {
            _options.preToggle(e, $elem, label, level, childrenCount);
        }
        
        //handle toggle
        $elem.closest("li").children(".nav").toggle("fast");
        if( $elem.find(".icon-plus").length){
            $elem.find(".icon-plus").toggleClass("icon-plus icon-minus ");
        }else{
            $elem.find(".icon-minus").toggleClass("icon-minus icon-plus ");
        }
        
        //handle post toggle event
        if (_options.postToggle !== undefined && !_isFirstRun) {
            _options.postToggle(e, $elem, label, level, childrenCount);
        }
    }
    
    function _parseJson(treeLayout, $ul, length){
        $.each(treeLayout, function(i,d){
            var $li = $("<li ></li>");    
            length = this.children.length;
            if(this.children.length > 0){
                $li.append("<a class='tbTree-toggle'"
					+ 
					"title='" + this.label + "'href='#'><i class='icon-minus '></i>"
					+
                    trunc(this.label, _options.truncate, false)
                    + 
                    " (" + length + ")</a>");
                
                $li.children(".tbTree-toggle").attr("data-children-count", length);
                $li.children(".tbTree-toggle").attr("data-label", this.label );
                $li.children(".tbTree-toggle").attr("data-label-shortened", trunc(this.label, _options.truncate, false) );
                
                
                var $subUl = $("<ul class='tbTree-connectable nav nav-list'></ul>");
                $li.append($subUl);
                _parseJson(this.children, $subUl, length);
            }else{
               	if(d.count !== undefined){
					$li.append("<a class='tbTree-toggle'"
						+ 
						"title='" + this.label + "'href='#'><i class='icon-blank '></i>"
						+
						trunc(this.label, _options.truncate, false)
						+ 
						" (" + d.count + ")</a>");
						
					$li.children(".tbTree-toggle").attr("data-children-count", d.count);
					$li.children(".tbTree-toggle").attr("data-label", this.label );
					$li.children(".tbTree-toggle").attr("data-label-shortened", trunc(this.label, _options.truncate, false) );
				}else{
					$li.append("<a class='tbTree-toggle'"
						+ 
						"title='" + this.label + "'href='#'><i class='icon-blank '></i>"
						+
						trunc(this.label, _options.truncate, false)
						+ 
						" </a>");
						
					$li.children(".tbTree-toggle").attr("data-children-count", 0);
					$li.children(".tbTree-toggle").attr("data-label", this.label );
					$li.children(".tbTree-toggle").attr("data-label-shortened", trunc(this.label, _options.truncate, false) );
				}
            }            
            $ul.append($li);
        });
    }

    function _calculateDepth(){
        var level = 0;
        $(_self).find("ul").each(function() {
            var depth = $(this).parents('ul').length;
           
			$(this).children()
			.children("a")
			.addClass("tbTree-level-" + depth)
			.attr("data-level", depth);          
            
            if(_depth < depth){
                _depth = depth;
            }
        });
    }
	
	function trunc(str, n, useWordBoundary){
		 var toLong = str.length>n,
             s_ = toLong ? str.substr(0,n-1) : str;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '&hellip;' : s_;
	}
})(jQuery);
