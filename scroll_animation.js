(function($){
    $.fn.scrollAnim = function(option){
        return this.each(function(){
            var $this = $(this),
                data = $this.data('scrollAnim');
            if (! data) {
                data = new ScrollAnim($this, option);
                data.init();
                $this.data('scrollAnim',data)
            }
        });
    }
}(jQuery));

function ScrollAnim(selector, option) {
    this.selector = selector;
};

ScrollAnim.prototype = {
    constructor: ScrollAnim,

    init : function () {
        var shift = this.selector.data('fade-shift')
        if (! shift) {
            shift = 0;
        }
        this.shift = shift;
        this.fadeElem();

        this.fadeWhenResize();
        this.fadeWhenScroll();
    },

    fadeElem: function(){
        var el = this.selector;
        el.css('display', 'none');

        switch (this.shift) {
            case undefined:
                shift = 0;
                break;
            case 'h':
                shift = el.eq(0).outerHeight();
                break;
            case 'h/2':
                shift = el.eq(0).outerHeight() / 2;
                break;
        }
        $(window).on('resize', this.fadeWhenResize.bind(this)
            ).on('scroll', this.fadeWhenScroll.bind(this));
    },

    fadeWhenScroll: function() {
        var el = this.selector;
        if (!el.hasClass('ani-processed')){
            if($(window).scrollTop() >= el.eq(0).data('scrollPos')){
                el.addClass('ani-processed');
                el.each(function(idx) {
                    // $(this).css({'margin-top': '100px'});
                    // $(this).delay(idx * 200).animate({
                    //     'margin-top': 0
                    // }, 700)
                    $(this).delay( 200 ).fadeIn( 400 );
                });
            }
        }
    },

    fadeWhenResize : function() {
        if (!this.selector.hasClass('ani-processed')) {
            this.selector.eq(0).data('scrollPos', this.selector.eq(0).offset().top - $(window).height() + this.shift);
        }
    }
};