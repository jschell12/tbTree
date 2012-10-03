(function($){
    $.fn.extend({
        tbTree: function(options) {
            var defaults = {
                treeLayout: {},
				level: 0,
            };
            var options =  $.extend(defaults, options);
            var self = this;
			
			/* public functions */
			self.getOptions = function(){
				return options;
			};
			
			self.getDepth = function(){
				
				return options.level;
				
			};		
			
            init(self, options);
			
            return this.each(function() {
                var o = options;
            });
        }
    });

	
	/* private functions */
	
    function init(self, options){
        var toggled = false;
        var $ul = $("<ul class='level nav nav-list'></ul>");    
		var level = 0;//first level
        parseJson(options.treeLayout, $ul);
        $(self).append($ul);
        $(self).find(".toggle").click(function(){
            $(this).closest("li").children(".nav").toggle("fast");
            if( $(this).find(".icon-plus").length){
                $(this).find(".icon-plus").toggleClass("icon-plus icon-minus ");
                toggled = true;
            }else{
                $(this).find(".icon-minus").toggleClass("icon-minus icon-plus ");
                toggled = false;            
            }
        });    
        
        $(self).find(".toggle").click();    
        $(self).find("li > .nav").hide();
		
		var level = 0;
		$(self).find("ul").each(function() {
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
			
			if(options.level < depth){
				options.level = depth;
			}
		});		
    }

    
    function parseJson(treeLayout, $ul){
        $.each(treeLayout, function(i,d){
            var $li = $("<li class=''></li>");
			
		
			if(this.children.length > 0){
				$li.append("<a class='toggle' data-childrencount='" + this.children.length + "' href='#'><i class='icon-minus '></i>" + this.label + "</a>");  				
				var $subUl = $("<ul class='level nav nav-list'></ul>");
				$li.append($subUl);                         
				parseJson(this.children, $subUl);   
			}else{				
				$li.append("<a class='toggle' href='#'><i class='icon-blank'></i>" + this.label + "</a>");        				
			}
			
            $ul.append($li);
			var depth = $ul.children('ul').length;
        });
    }

})(jQuery);