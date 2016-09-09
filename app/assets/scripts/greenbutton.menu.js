/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

(function ($)
{
    "use strict"; 

    /*  MENU CLASS DEFINITION
     * ========================= */
    var toggle = '[data-toggle=usermenu]';
    var UserMenu = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle);
        $('html').on('click.dropdown.data-api', function() {
            $el.parent().removeClass('open');
        });
    };


    UserMenu.prototype =
    {
        constructor: UserMenu,

        toggle: function(/* e */) {
            var $this = $(this);
            var $parent = getParent($this);
            var $menuBody = $parent.find('.usermenu-menu');

            var isActive = $menuBody.hasClass('open');
            if (isActive) {
                $menuBody.slideUp(350, function() {
                    $parent.removeClass('open');
                    $menuBody.removeClass('open');
                });

                return false;
            }

            $parent.addClass('open');
            $menuBody.slideDown(350, function() {
                $menuBody.addClass('open');
                $this.focus();
            });

            return false;
        }
    };

    function clearMenus() {
        $(toggle).each(function() {

            var $parent = getParent($(this));
            var $menuBody = $parent.find('.usermenu-menu');

            $menuBody.slideUp(350, function() {
                $parent.removeClass('open');
                $menuBody.removeClass('open');
            });
        });
    }

    function getParent($this) {
        var selector = $this.attr('data-target'), $parent;

        if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        $parent = selector && $(selector);
        if (!$parent || !$parent.length) {
            $parent = $this.parent();
        }

        return $parent;
    }


    $(document)
        .on('click.dropdown.data-api', clearMenus)
        .on('click.dropdown.data-api', '.dropdown form', function(e) { e.stopPropagation(); })
        .on('click.usermenu-menu', function(e) { e.stopPropagation(); })
        .on('click.dropdown.data-api', toggle, UserMenu.prototype.toggle);

}(jQuery));
