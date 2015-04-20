'use strict';
/*
@auth Boelroy

@name ScrollFire

@description 滚动时动态显示动画的jQuery插件
@description jQuery plugins show the animation when scroll the page

*/

//初始化jQuery插件
(function($){
    $.fn.scrollFire = function(option){
        return this.each(function(){

            var $this = $(this),
                opt = $.extend( {}, $.fn.scrollFire.default, option),
                data = $this.data('scrollFire');

            if (! data) {
                data = new ScrollFire($this, opt);
                data.init();
                $this.data('scrollFire',data)
            }
            if (option && typeof option === "string"){
                if(option === 'now')
                    data.fireInstance();
                else (option === 'hide')
                    data.hideEle();
            }

        });
    };
    $.fn.scrollFire.default = {
        model: 'single'
    }
}(jQuery));


function ScrollFire(selector, option) {
    this.selector = selector;
    this.model = option.model;
};

ScrollFire.prototype = {
    constructor: ScrollFire,

    init : function () {
        var shift = this.selector.data('fade-shift');
        var delay = this.selector.data('delay');
        var classes = this.selector.data('animate');
        if (! shift) {
            shift = 0;
        }
        if (! delay) {
            delay = 0;
        }
        this.classes = classes;
        this.shift = shift;
        this.delay = delay;
        this.scrollFire();

        this.fireWhenResize();
        this.fire();
    },

    hideEle : function(){
        var el = this.selector;
        switch(this.model){
            case 'single' :
                el.css({
                    opacity: 0
                });
                break;
            case 'group' :
                el.find('.scroll-fire-item').each(function() {
                    $(this).css({
                        opacity: 0
                    });
                })
                break;
        }
    },

    showEle : function(){
        var el = this.selector;
        switch(this.model){
            case 'group':
                el.find('.scroll-fire-item').each(function(idx) {
                    $(this).css( { 
                        opacity:1
                    });
                })
                break;
            case 'single':
                el.css( { 
                    opacity:1
                });
                break;
        }
    },

    scrollFire: function(){

        this.hideEle();
        this.fire.bind(this);
        this.fireInstance.bind(this);
        $(window).on('resize', this.fireWhenResize.bind(this)
            ).on('scroll', this.fire.bind(this));
    },

    getScrollOffset: function(el){
        return $(window).scrollTop() - el.eq(0).data('scrollPos');
    },

    fire : function(){
        var el = this.selector;
        if (!el.hasClass('ani-processed')){
            
            if(this.getScrollOffset(el) < this.shift+300
                && this.getScrollOffset(el) > this.shift){
                el.addClass('ani-processed');
                this.fireInstance();
            }else if (this.getScrollOffset(el) > this.shift+300) {
                el.addClass('ani-processed');
                this.showEle();
            }
        }
    },

    fireInstance: function(){
        var el = this.selector;
        var that = this;
        switch(this.model){
            case 'single':

                el.each(function(idx) {
                        that.animateDelay($(this));
                    });
                break;

            case 'group':

                el.find('.scroll-fire-item').each(function(idx) {
                    el.css( { 
                        opacity:'none'
                    });
                    that.animateDelay($(this));
                });
                break;
        }
        
    },

    animateDelay : function(el){
        var delay = el.data('delay');
        var classes = el.data('animate');
        setTimeout(function(){
            el.addClass( classes + ' animated' ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                el.css({
                    opacity:1
                })
                el.removeClass( classes+' animated' );
            })
            if(!classes || classes.search('fade') == -1){
                el.css( { 
                    opacity:1
                });
            }
        }, delay);
    },

    fireWhenResize : function() {
        if (!this.selector.hasClass('ani-processed')) {
            this.selector.eq(0).data('scrollPos', this.selector.eq(0).offset().top - $(window).height());
        }
    }
};