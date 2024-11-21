(function ($) {
  "use strict";

  $(document).ready(function () {
    // Initially hide all submenus
    $(".mega-menu-column:not(:first-child)").hide();
    $(".submenu-list, .subsubmenu-list").hide();

    // Function to show active menu path
    function showActivePath() {
      // Find all active items
      var activeThirdLevel = $(".subsubmenu-list .mega-menu-item.active");
      var activeSecondLevel = $(".submenu-list .mega-menu-item.active");
      var activeFirstLevel = $(
        ".mega-menu-column:first-child .mega-menu-item.active"
      );

      // Add active class to dropdown toggle if any menu item is active
      if (
        activeThirdLevel.length ||
        activeSecondLevel.length ||
        activeFirstLevel.length
      ) {
        $(".mega-dropdown .dropdown-toggle").addClass("active");
      }

      // Handle first level active path
      if (activeFirstLevel.length) {
        var menuId = activeFirstLevel.data("menu-id");
        if ($('.submenu-list[data-parent="' + menuId + '"]').length) {
          // Show second column
          $(".mega-menu-column:nth-child(2)").show();
          $(".submenu-list").hide();
          $('.submenu-list[data-parent="' + menuId + '"]').show();

          // Add active class to parent column
          $(".mega-menu-column:nth-child(2)").addClass("active-column");
        }
      }

      // Handle second level active path
      if (activeSecondLevel.length) {
        var submenuId = activeSecondLevel.data("submenu-id");
        if ($('.subsubmenu-list[data-parent-sub="' + submenuId + '"]').length) {
          // Show third column
          $(".mega-menu-column:nth-child(3)").show();
          $(".subsubmenu-list").hide();
          $('.subsubmenu-list[data-parent-sub="' + submenuId + '"]').show();

          // Add active class to parent column
          $(".mega-menu-column:nth-child(3)").addClass("active-column");
        }
      }

      // Add active-parent class to parent menu items
      if (activeThirdLevel.length) {
        var parentSubmenuId = activeThirdLevel
          .closest(".subsubmenu-list")
          .data("parent-sub");
        $(
          '.mega-menu-item[data-submenu-id="' + parentSubmenuId + '"]'
        ).addClass("active-parent");
      }
      if (activeSecondLevel.length) {
        var parentMenuId = activeSecondLevel
          .closest(".submenu-list")
          .data("parent");
        $('.mega-menu-item[data-menu-id="' + parentMenuId + '"]').addClass(
          "active-parent"
        );
      }
    }

    // First level menu hover
    $(document).on(
      "mouseenter",
      ".mega-menu-column:first-child .mega-menu-item",
      function () {
        var menuId = $(this).data("menu-id");
        var hasSubmenu =
          $('.submenu-list[data-parent="' + menuId + '"]').length > 0;

        // Reset all columns first
        $(".mega-menu-column:not(:first-child)")
          .hide()
          .removeClass("active-column");
        $(".submenu-list, .subsubmenu-list").hide();
        $(".mega-menu-item").removeClass("hover-active");

        // Add hover-active class to current item
        $(this).addClass("hover-active");

        // Only show second column if submenu exists
        if (hasSubmenu) {
          $(".mega-menu-column:nth-child(2)").show();
          $('.submenu-list[data-parent="' + menuId + '"]').show();
        }
      }
    );

    // Second level menu hover
    $(document).on(
      "mouseenter",
      ".mega-menu-column:nth-child(2) .mega-menu-item",
      function () {
        var submenuId = $(this).data("submenu-id");
        var hasSubSubmenu =
          $('.subsubmenu-list[data-parent-sub="' + submenuId + '"]').length > 0;

        // Hide third column first
        $(".mega-menu-column:nth-child(3)").hide().removeClass("active-column");
        $(".subsubmenu-list").hide();
        $(".mega-menu-column:nth-child(2) .mega-menu-item").removeClass(
          "hover-active"
        );

        // Add hover-active class to current item
        $(this).addClass("hover-active");

        // Only show third column if subsubmenu exists
        if (hasSubSubmenu) {
          $(".mega-menu-column:nth-child(3)").show();
          $('.subsubmenu-list[data-parent-sub="' + submenuId + '"]').show();
        }
      }
    );

    // Keep dropdown open on hover
    $(".mega-dropdown").hover(
      function () {
        $(this).addClass("show");
        $(this).find(".dropdown-menu").addClass("show");
        $(this).find(".dropdown-toggle").addClass("hover"); // Add hover class
        showActivePath();
      },
      function () {
        $(this).removeClass("show");
        $(this).find(".dropdown-menu").removeClass("show");
        $(this).find(".dropdown-toggle").removeClass("hover");
        $(".mega-menu-column:not(:first-child)")
          .hide()
          .removeClass("active-column");
        $(".submenu-list, .subsubmenu-list").hide();
        $(".mega-menu-item").removeClass("hover-active");
      }
    );

    // Show active path when dropdown is shown
    $(".mega-dropdown").on("show.bs.dropdown", function () {
      showActivePath();
    });

    // Prevent menu from closing when clicking inside
    $(".mega-dropdown-menu").on("click", function (e) {
      e.stopPropagation();
    });
  });

  /* ------------------------------
	SUB NAV JS
	------------------------------ */
  $(document).ready(function () {
    $(".sub-nav-title").click(function () {
      $(this).parent().find("ul").slideToggle(300);
      $(this).parent().siblings().find("ul").slideUp(300);
      return false;
    });
  });

  /* ------------------------------
	ANIMATION JS
	------------------------------ */
  $(function () {
    function ckScrollInit(items, trigger) {
      items.each(function () {
        var ckElement = $(this),
          AnimationClass = ckElement.attr("data-animation"),
          AnimationDelay = ckElement.attr("data-animation-delay");

        ckElement.css({
          "-webkit-animation-delay": AnimationDelay,
          "-moz-animation-delay": AnimationDelay,
          "animation-delay": AnimationDelay,
          opacity: 0,
        });

        var ckTrigger = trigger ? trigger : ckElement;

        ckTrigger.waypoint(
          function () {
            ckElement.addClass("animated").css("opacity", "1");
            ckElement.addClass("animated").addClass(AnimationClass);
          },
          {
            triggerOnce: true,
            offset: "90%",
          }
        );
      });
    }

    ckScrollInit($(".animation"));
    ckScrollInit($(".staggered-animation"), $(".staggered-animation-wrap"));
  });

  /* ------------------------------
	BOOTSTRAP TOOLTIP
	------------------------------ */
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  /* ------------------------------
	BOOTSTRAP POPOVER
	------------------------------ */
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  /* ------------------------------
	SEARCH FULL TOGGLE
	------------------------------ */
  $(document).ready(function () {
    $(".search-toggle").on("click", function () {
      $(".search-full").show();
    });
    $(".search-close-btn").on("click", function () {
      $(".search-full").hide();
    });
  });

  /* ------------------------------
	FOOTER FAMILY SITE DROPUP
	------------------------------ */
  $(document).ready(function () {
    $(".family-site dt a").click(function () {
      $(".family-site dd").slideToggle(300);
      return false;
    });
  });

  /* ------------------------------
	BACK TO TOP
	------------------------------ */
  $(document).ready(function () {
    var prgsPath = document.querySelector(".eb-backtotop path");
    var pathLength = prgsPath.getTotalLength();
    prgsPath.style.transition = prgsPath.style.WebkitTransition = "none";
    prgsPath.style.strokeDasharray = pathLength + " " + pathLength;
    prgsPath.style.strokeDashoffset = pathLength;
    prgsPath.getBoundingClientRect();
    prgsPath.style.transition = prgsPath.style.WebkitTransition =
      "stroke-dashoffset 0.01s linear";

    var chkPrgs = function () {
      var scrollTop = $(window).scrollTop();
      var pageHeight = $(document).height() - $(window).height();
      var percentage = (scrollTop / pageHeight) * 100;
      var textColor;
      var prgs = pathLength - (scrollTop * pathLength) / pageHeight;
      prgsPath.style.strokeDashoffset = prgs;

      if (percentage > 99) {
        textColor = "#2b2b2e";
      } else {
        textColor = "#a5a5a5";
      }

      $(".progress-count")
        .text(Math.round(percentage) + "%")
        .css({ color: textColor });
    };
    chkPrgs();
    $(window).scroll(chkPrgs);
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 50) {
        $(".eb-backtotop").addClass("active-progress");
      } else {
        $(".eb-backtotop").removeClass("active-progress");
      }
    });
    $(".eb-backtotop, .btt-up-btn").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 500);
      return false;
    });
    $(".btt-down-btn").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: $(document).height() }, 500);
      return false;
    });
  });
})(jQuery);
