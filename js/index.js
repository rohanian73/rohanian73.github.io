// Preloader

const preloader = document.getElementById('preloader');
const wrapper = document.querySelector('.wrapper');

function init() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        preloader.style.opacity = '0';
        document.body.style.overflowY = 'auto';

        setTimeout(() => {
            preloader.style.display = 'none';
            wrapper.style.opacity = '1';
        }, 300);
    }, 4000);
}

init();

// Top Btn

const topBtn = document.querySelector('.top-btn');

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.top-btn').fadeIn();
        } else {
            $('.top-btn').fadeOut();
        }
    });

    $('.top-btn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
});


// Slider

$(document).ready(function () {
    $('.slider').slick({
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1501,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1001,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});

// Openning Overview

const sliderCard = document.querySelectorAll(".slider-card");
const sliderCardBack = document.querySelectorAll(".slider-card__back");

for (let i = 0; i < sliderCard.length; i++) {
    sliderCard[i].addEventListener('click', openOverview);
}

function openOverview() {
    this.classList.toggle('active');
    for (let i = 0; i < sliderCard.length; i++) {
        if (sliderCard[i].classList.contains('active')) {
            sliderCardBack[i].style.transform = 'translateY(0)';
        } else {
            sliderCardBack[i].style.transform = 'translateY(100%)';
        }
    }
}



// Smooth Anchor Links

const navLinks = document.querySelectorAll('.nav-link');

for (let navLink of navLinks) {
    navLink.addEventListener('click', (e) => {
        e.preventDefault();

        const sectionID = navLink.getAttribute('href');
        document.querySelector('' + sectionID).scrollIntoView({
            behavior: 'smooth',
        });
    });
}

// Smooth Appearance while Scrolling

const animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 3;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                animItem.classList.add('active');
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('active');
                }
            }
        }
    }
    function offset(element) {
        const rect = element.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}

// Header Burger Btn

const headerBurgerBtn = document.querySelector('.header-burger-btn');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');

headerBurgerBtn.addEventListener('click', () => {

    headerBurgerBtn.classList.toggle('active');

    if (headerBurgerBtn.classList.contains('active')) {
        navList.style.top = '100%'
    } else {

        if (matchMedia) {
            let screen = window.matchMedia('(max-width: 700px)');
            screen.addListener(changes);
            changes(screen);
        }

        function changes(screen) {
            if (screen.matches) {
                navList.style.top = '-500%';
            } else {
                navList.style.top = '100%';
            }
        }

    }

});

// Disappearance of Nav Menu after clicking

const navItems = document.querySelectorAll('.nav-item');

for (let navItem of navItems) {

    navItem.addEventListener('click', () => {
        navList.style.top = '-500%';
        headerBurgerBtn.classList.remove('active');
    });

}