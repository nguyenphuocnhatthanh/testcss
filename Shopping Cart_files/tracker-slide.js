$j(document).ready(function($) {
  'use strict';

  var Slider = function() {
    var _this = this;
    this.$container = $('#slider');
    this.$colorSwitcher = $('#color-switcher');
    this.$slidesList = $('#slide-list');
    this.$centralSlide = this.$slidesList.find('.central');

    this.init = function() {
      this.$slidesList.on('click', '.slide:not(.central)', this.slideClickHandler);
      this.$colorSwitcher.on('click', 'li:not(.active)', this.switchColorHandler);
      this.$centralSlide.find('.image_holder').html('<img src="">');
      this.$slidesList.find('.slide:first').trigger('click');
    };

    this.changeCentralImage = function(src) {
      this.$centralSlide.find('img').animate({
        opacity:0
      }, 300, function() {
        $(this).attr('src', src);
        $(this).animate({
          opacity: 1
        }, 300);
      }).dequeue();
    };

    this.updateBuyNowButtons = function(productID, price) {
      $('#buy_btn').data('product-id', productID).html('BUY NOW $' + price);
    };

    this.switchColorHandler = function() {
      var color = $(this).attr('data-color');
      var $selectedSlide = _this.$slidesList.find('.slide.selected');
      var $selectedProductImg = $selectedSlide.find('img[data-color="' + color + '"]')
      var productID = $selectedProductImg.data('product-id');
      _this.updateBuyNowButtons($selectedProductImg.data('product-id'), $selectedSlide.data('price'));
      _this.$colorSwitcher.find('li').removeClass('active');
      $(this).addClass('active');
      _this.changeCentralImage($selectedProductImg.attr('src'));
        $('div.btn_holder a').attr('data-product-id', productID);
        $('div.btn_holder a').attr('data-url', '/variation?id='+ productID);
    };

    this.slideClickHandler = function(evt) {
      var $selectedSlide = $(this);
      var price = $selectedSlide.data('price');

      var mainColor = $selectedSlide.data('main-color');

      _this.$slidesList.find('.slide.selected').removeClass('selected');
      $selectedSlide.addClass('selected');

      var firstProductId = $selectedSlide.find('img[data-color="' + mainColor + '"]').data('product-id');
      var mainImageUrl = $selectedSlide.find('img').attr('src');

      _this.changeCentralImage(mainImageUrl);
      _this.updateBuyNowButtons(firstProductId, price);

      var colors = [];
      $selectedSlide.find('img[data-color]').each(function() {
        colors.push($(this).data('color'));
      });
      $('div.btn_holder a').attr('data-product-id', firstProductId);
        $('div.btn_holder a').attr('data-url', '/variation?id='+firstProductId);
      _this.$colorSwitcher.find('li').each(function() {
        var $_this = $(this);
        $_this.removeClass('active');
        var switchColor = $_this.data('color');
        if(colors.indexOf(switchColor) > -1) {
          $_this.removeClass('hide');
        } else {
          $_this.addClass('hide');
        }
        if(mainColor === switchColor) {
          $_this.addClass('active');
        }
      });

      _this.$colorSwitcher.removeClass('hide');
    };
  };

  var slide = new Slider();
  slide.init();
});
