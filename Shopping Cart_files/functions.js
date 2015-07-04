$j(document).ready(function($) {

    var checkAjax = false;
    $('.good_items li').on('click', ' a ', function(e){
        e.preventDefault();
        if(checkAjax) return;
        checkAjax = true;
        $.ajax({
            url : $(this).attr('data-url'),
            type : 'GET',
            dataType : 'JSON',
            success : function(result) {
                var resultHTML = '';
                $.each(result, function(key, value) {
                    resultHTML += ' <div class="shopping_cell">';
                    resultHTML += '<h3>'+value.sku+'</h3>';
                    resultHTML += '<div class="img">';
                    resultHTML += '<img src="'+value.image+'" alt="">';
                    resultHTML += '</div>';
                    resultHTML += '<div class="count">';
                    resultHTML += '<input type="text" class="count_input" value="1">';
                    resultHTML += '</div>';
                    resultHTML += '<a href="#" data-product-id="'+value.id+'" class="add-to-cart btn btn_cart">add to cart</a>';
                    resultHTML += '</div>';
                });

                $('.shopping_table').html(resultHTML);
                $('.popup').show();
            }
        }).always(function() {
            checkAjax = false;
        });
    });

    $('.btn_holder').on('click', 'a.add-to-cart, a#buy_btn', function (e) {
        e.preventDefault();
        var thisElement = $(this);
        var input = $(this).closest('.shopping_cell').find('input');
        var productId = $(this).attr('data-product-id');
        var checkSelector = input.context.id;
        var qty;
        if (input.context.id == 'buy_btn') { // on the slider
          qty = 1;
        } else {
          qty = input.val();
        }
        if (isNaN(qty) || (qty < 1)) {
          bootbox.alert("Quantity is not a valid number!");
          return;
        }
        if (checkAjax) return;
        checkAjax = true;
        Helper.togglePageLoading();
        $.ajax({
            url: '/avia/variation/addcart',
            type: 'GET',
            data: {
                productId: productId,
                qty: qty
            },
            dataType: 'JSON',
            success: function (res) {
                Helper.showCartUpdateModal(
                    res.message,
                    res.success,
                    function(e) {
                        if(res.success) {
                            $('.basket span').html(res.totalCart);
                        }
                    }
                )
            }
        }).always(function () {
            checkAjax = false;
            Helper.togglePageLoading();
        });
    });

    $('#form-subscribe').submit(function(e) {
        e.preventDefault();
        if (checkAjax) return;
        checkAjax = true;
        Helper.togglePageLoading();
        var $input = $(this).find('input');
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: {
              email: $input.val()
            },
            success: function(result) {
                bootbox.alert(result.message);
                if(result.success) {
                    $input.val('');
                }
            }
        }).always(function() {
            checkAjax = false;
            Helper.togglePageLoading();
        });
    });

    /**
     * Related products in checkout onepage
    */
    $('.box-like').on('click', 'button.btn', function(e) {
        e.preventDefault();
        if (checkAjax) return;
        checkAjax = true;
        $.ajax({
            url: '/avia/variation/addcart',
            data: {
                productId: $(this).attr('data-product-id'),
                qty: 1
            },
            type: 'GET',
            success: function(res) {
                Helper.showCartUpdateModal(
                    res.message,
                    res.success,
                    function(e) {
                        if(res.success) {
                            window.location.reload();
                        }
                    }
                );
            }
        }).always(function() {
            checkAjax = false;
        });
    });
/*    var heightDivTableCart = $('.cart-item div:first-child').height();
    $('.cart-item div:even').height(heightDivTableCart);

    $('.cart-item div:nth-child(4n - 1)').height(heightDivTableCart);
    $('.cart-item div:nth-child(2)').height(heightDivTableCart);

    console.log(heightDivTableCart);
    $(window).resize(function() {

        var widthDivTableCart = $(window).width();
        console.log("width: "+widthDivTableCart);
        if(widthDivTableCart > 1193 && widthDivTableCart < 1365) {
            heightDivTableCart = $('.cart-item div').height();
            $('.cart-item div:even').height(heightDivTableCart);

            $('.cart-item div:nth-child(4n - 1)').height(heightDivTableCart);
            $('.cart-item div:nth-child(2)').height(heightDivTableCart);

            //     alert('adsad');
        }else if(widthDivTableCart < 1193) {

            $('.cart-item div:nth-child(2n)').height($('.cart-item div').height());
        }

        console.log(heightDivTableCart);
    });*/
});
