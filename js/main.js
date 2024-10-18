
// section7
      
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  //  Responsive breakpoints
      breakpoints: {
    0: {
      slidesPerView: 1,
      },
    640: {
    slidesPerView: 1,
    },
    
    768: {
    slidesPerView: 2,
    },
    908: {
      slidesPerView:3,
      }
    
  }
    
  });
  


// form  on navbar
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('modal');

    // عند الضغط على زرار "Build Your Own Package" يتم إظهار الفورم مع الأنيميشن
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });

    // عند الضغط على زر "X" يتم إخفاء الفورم
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // إخفاء الفورم عند الضغط خارجها
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });


// form on login as user  
        document.addEventListener("DOMContentLoaded", function() {
            // الوصول إلى العناصر
            let loginForm = document.getElementById("loginForm");
            let signUpForm = document.getElementById("signUpForm");
            let LoginAdmin =document.getElementById("loginAdmin");
            let showSignUpLink = document.getElementById("showSignUp");
            let showLoginLink = document.getElementById("showLogin");
            let loginAdminForm = document.getElementById("loginadminForm");

            // الحدث عند الضغط على "Sign up"
            showSignUpLink.addEventListener("click", function(event) {
                event.preventDefault(); // منع إعادة تحميل الصفحة
                loginForm.style.display = "none"; // إخفاء فورم تسجيل الدخول
                signUpForm.style.display = "block"; // إظهار فورم التسجيل
            });

            // الحدث عند الضغط على "Login"
            showLoginLink.addEventListener("click", function(event) {
                event.preventDefault(); // منع إعادة تحميل الصفحة
                signUpForm.style.display = "none"; // إخفاء فورم التسجيل
                loginForm.style.display = "block"; // إظهار فورم تسجيل الدخول
            });
            
            // الحدث عند الضغط على "Login As Admin"
            LoginAdmin.addEventListener("click", function(event) {
                event.preventDefault(); // منع ��عادة تحميل الصفحة
                loginForm.style.display = "none"; // ��خفا�� فورم تسجيل الدخول
                loginAdminForm.style.display = "block"; // ����هار فورم تسجيل الدخول كمشرف
            });
        });

    
// store username and password of admin login in localStorage 
        document.getElementById("loginadminForm").addEventListener("submit", function(event) {

        //  let adminUsername =  localStorage.setItem("adminUsername", "admin");
            // localStorage.setItem("adminPassword", "1234");

            event.preventDefault(); // منع ��عادة تحميل الصفحة

            let adminUsernameInput = document.getElementById("adminUsernameInput").value;
            let adminPasswordInput = document.getElementById("adminPasswordInput").value;
            if( adminUsernameInput === "admin" &&  adminPasswordInput  === "1234"){
                
                 window.location.href = "../AdminLogin.html"; // هنا يمكنك تحديد الصفحة المطلوبة
                
            } else {
                alert("Invalid Credentials!");
                
            }
            // make input empty after login
            document.getElementById("adminUsernameInput").value = ""
            document.getElementById("adminPasswordInput").value = ""

        });
           

        // login admin after registration
        document.getElementById("loginadminForm").addEventListener("submit", function(event) {
            event.preventDefault(); // منع ��عادة تحميل الصفحة
            
        });

    


















































  



// section 8 
jQuery( document ).ready( function ( $ ) {
const $feedbackSlider = $( '.feedback-slider' );

if ( $feedbackSlider.length ) {
$feedbackSlider.owlCarousel( {
items: 1,
nav: true,
dots: true,
autoplay: false,
loop: true,
mouseDrag: true,
touchDrag: true,
navText: [
    '<i class="fa fa-long-arrow-left"></i>',
    '<i class="fa fa-long-arrow-right"></i>'
],
responsive: {
    // viewport >= 767px
    767: {
        nav: true,
        dots: false
    }
}
} );

$feedbackSlider.on( 'translate.owl.carousel', function() {
$( '.feedback-slider-item h3' )
    .removeClass( 'animated fadeIn' )
    .css( 'opacity', '0' );

$( '.feedback-slider-item img, .feedback-slider-thumb img, .customer-rating' )
    .removeClass( 'animated zoomIn' )
    .css( 'opacity', '0' );
} );

$feedbackSlider.on( 'translated.owl.carousel', function() {
$( '.feedback-slider-item h3' )
    .addClass( 'animated fadeIn' )
    .css( 'opacity', '1' );

$( '.feedback-slider-item img, .feedback-slider-thumb img, .customer-rating' )
    .addClass( 'animated zoomIn' )
    .css( 'opacity', '1' );
} );

$feedbackSlider.on( 'changed.owl.carousel', function( property ) {
const current = property.item.index;

const prevThumb = $( property.target )
    .find( '.owl-item' )
    .eq( current )
    .prev()
    .find( 'img' )
    .attr( 'src' );

const nextThumb = $( property.target )
    .find( '.owl-item' )
    .eq( current )
    .next()
    .find( 'img' )
    .attr( 'src' );

const prevRating = $( property.target )
    .find( '.owl-item' )
    .eq(current)
    .prev()
    .find( 'span' )
    .attr( 'data-rating' );

const nextRating = $( property.target )
    .find( '.owl-item' )
    .eq( current )
    .next()
    .find( 'span' )
    .attr( 'data-rating' );

$( '.thumb-prev' ).find( 'img' ).attr( 'src', prevThumb );
$( '.thumb-next' ).find( 'img' ).attr( 'src', nextThumb );

$( '.thumb-prev' )
    .find( 'span' )
    .next()
    .html( prevRating + '<i class="fa fa-star"></i>' );

$( '.thumb-next' )
    .find( 'span' )
    .next()
    .html( nextRating + '<i class="fa fa-star"></i>' );
} );

$( '.thumb-next' ).on( 'click', function( e ) {
e.preventDefault();

$feedbackSlider.trigger( 'next.owl.carousel', [ 300 ] );
} );

$( '.thumb-prev' ).on( 'click', function( e ) {
e.preventDefault();

$feedbackSlider.trigger( 'prev.owl.carousel', [ 300 ] );
} );
}
} ); // end ready func

