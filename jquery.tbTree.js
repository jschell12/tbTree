(function($){
    $.fn.extend({
        //pass the options variable to the function
        tbTree: function(options) { 
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                layout: {},
            };
            var options =  $.extend(defaults, options);
            var self = this;
            init(self, options);
        
            return this.each(function() {
                var o = options;
            });
        }
    });

    function init(self, options){
        var toggled = false;
        var $ul = $("<ul class='level nav nav-list'></ul>");    
        parseJson(options.layout, $ul);
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
    }

    
    function parseJson(layout, $ul){
        $.each(layout, function(i,d){
            var $li = $("<li class=''></li>");
            if(this.children.length > 0){   
                $li.append("<a class='toggle' href='#'><i class='icon-minus '></i>" + this.label + "</a>");  
                var $subUl = $("<ul class='level nav nav-list'></ul>");
                $li.append($subUl);                         
                parseJson(this.children, $subUl);              
            }else{
                $li.append("<a class='toggle' href='#'><i class='icon-blank'></i>" + this.label + "</a>");        
            }
            $ul.append($li);
        });
    }

})(jQuery);