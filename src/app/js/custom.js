// $(function () {

//     // Navbar Sticky
//     $(window).on('scroll', function () {
//         if ($(window).scrollTop() > ($('.top-bar').outerHeight())) {
//             $('header.nav-holder.make-sticky').addClass('sticky');
//             $('body').css('padding-top', '' + $('#navbar').outerHeight() + 'px');

//         } else {
//             $('header.nav-holder.make-sticky').removeClass('sticky');
//             $('body').css('padding-top', '0');
//         }
//     }); 

//     // Multi-level dropdown
//     $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
//         event.preventDefault();
//         event.stopPropagation();

//         $(this).siblings().toggleClass("show");


//         if (!$(this).next().hasClass('show')) {
//             $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
//         }
//         $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
//             $('.dropdown-submenu .show').removeClass("show");
//         });

//     });

   
//     // Homepage Slider
//     $('.homepage').owlCarousel({
//         loop: true,
//         margin: 0,
//         dots: true,
//         nav: false,
//         autoplay: true,
//         smartSpeed: 1000,
//         addClassActive: true,
//         navText: [
//             "<i class='fa fa-angle-left'></i>",
//             "<i class='fa fa-angle-right'></i>"
//         ],
//         responsiveClass: true,
//         responsive: {
//             0: {
//                 items: 1
//             },
//             600: {
//                 items: 1
//             },
//             1000: {
//                 items: 1,
//                 loop: true
//             }
//         }
//     });

//     // Adding fade effect to dropdowns
//     $('.dropdown').on('show.bs.dropdown', function () {
//         $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100);
//     });
//     $('.dropdown').on('hide.bs.dropdown', function () {
//         $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100);
//     });
// //set focus in modal

// $('#login-modal').on('shown.bs.modal', function() {
//     $('#email_modal').focus();
//   })

//   $('#login-modal').on('shown.bs.modal', function() {
//     $('#email_modal').focus();
//   })

    

// });