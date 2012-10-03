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
                treeLayout: {},
				preToggle: function(e){},
				postToggle: function(e){},
            };
            _options =  $.extend(defaults, options);
            _self = this;
			
			_self.getOptions = getOptions;		
			_self.getDepth = getDepth;		
			_init(_self);
			
			return this.each(function() {
                var o = _options;
            });
        }
    });
	
	/* private functions */	
    function _init(_self){
		_isFirstRun = true;
        var $ul = $("<ul class='level nav nav-list'></ul>");
		var level = 0;//first level
        _parseJson(_options.treeLayout, $ul, 0);
        $(_self).append($ul);	
		_calculateDepth(_self);		
		_bindEvents(_self, _options);	
		
        $(_self).find(".toggle").click();   
		$(_self).find("li > .nav").hide();
		_isFirstRun = false;
    }

	function _bindEvents(_self){		
		//toggle click event
		$(_self).find(".toggle").click(function(e){			
			_handleToggle(e, this);							
		});
	}
    
	function _handleToggle(e, elem){
		var $elem = $(elem);
		var level = $elem.data("level");
		var label = $elem.data("label");
		var childrenCount = $elem.data("childrenCount");
		//var children = $elem.parent().children("li");
		
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
            var $li = $("<li class=''></li>");
			length = this.children.length;// + length;
			if(this.children.length > 0){
				$li.append("<a class='toggle' href='#'><i class='icon-minus '></i>" 
					+ 
					this.label 
					+ 
					" (" + length + ")</a>");
				
				$li.children(".toggle").attr("data-children-count", length);
				$li.children(".toggle").attr("data-label", this.label );
				
				
				var $subUl = $("<ul class='level nav nav-list'></ul>");
				$li.append($subUl);
				_parseJson(this.children, $subUl, length);
			}else{
				$li.append("<a class='toggle' href='#'><i class='icon-blank'></i>" 
					+ 
					this.label 
					+ 
					"</a>");
					
				$li.children(".toggle").attr("data-children-count", length);
				$li.children(".toggle").attr("data-label", this.label );
			}			
            $ul.append($li);
        });
    }

	function _calculateDepth(_self){
		var level = 0;
		$(_self).find("ul").each(function() {
			var depth = $(this).parents('ul').length;
			if(depth == 0){
				$(this).children()
				.children("a")
				.addClass("firstLevel")
				.attr("data-level", depth);
			}else{
				$(this).find("a")
				.not('.firstLevel')
				.addClass("facetLevel")
				.attr("data-level", depth);
			}
			
			if(_depth < depth){
				_depth = depth;
			}
		});
	}
})(jQuery);