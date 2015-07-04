/**
 * Helper for modal, alert, loading backdrop ...
 * @author Lht
 *
 */
var Helper;
(function($) {
    "use strict";

    var color = '#DB8918'; // The theme color
    Helper = {
        /**
         * Toggle loading overlay on a element(body if not specified)
         */
        togglePageLoading: function() {
            var $body = $('body');
            if ($body.hasClass('loading')) {
                $body.removeClass('loading');
                $body.find('.loading-backdrop').remove();
                $body.css({
                    overflow: '', position: ''
                });
            } else {
                $body.addClass('loading');
                var html = '<div class="loading-backdrop"> <div class="loading-indicator"><i class="fa fa-spinner fa-spin fa-3x"></i></div></div>';
                $body.append(html);
                $body.find('.loading-backdrop').css({
                    'z-index': '15000',
                    'background': 'rgba(255, 255, 255, 0.75)',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: 0,
                    left: 0
                });
                $body.find('.loading-indicator').css({
                    opacity: '1',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    color: color
                });
                $body.css({
                    position: 'relative'
                });
            }
            return $body.hasClass('loading');
        },
        /**
         * Display the modal to notice the cart update
         */
        showCartUpdateModal: function(message, successState, closeCallback) {
            var $modal = $('#modal-cart-update-notice');
            var $messageContainer = $modal.find('.message');
            $messageContainer.html(message);
            var containerClass;
            if (successState) {
                containerClass = 'text-success';
                $messageContainer.addClass('text-success').removeClass('text-danger');
            } else {
                $messageContainer.addClass('text-danger').removeClass('text-success');
            }
            $modal.modal('show');
            if('function' === typeof closeCallback) {
                $modal.on('hidden.bs.modal', function(evt) {
                    closeCallback(evt);
                });
            }
        }
    };
})($j);
