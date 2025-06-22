/**
 * Main JavaScript file for Mazraa Chalets Website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactive elements
    initAnimations();
    initMobileMenu();
    initScrollEffects();
    
    // Add event listeners for interactive elements
    addEventListeners();
});

/**
 * Initialize GSAP and AOS animations
 */
function initAnimations() {
    // Initialize AOS library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // GSAP animations for hero section
    gsap.from(".hero-content h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });
    
    gsap.from(".hero-content p", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from(".hero-content a", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });
    
    // Animate navigation items
    gsap.from("nav a", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate mobile menu items when opened
            if (!mobileMenu.classList.contains('hidden')) {
                gsap.from("#mobile-menu a", {
                    opacity: 0,
                    x: -20,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                });
            }
        });
    }
}

/**
 * Initialize scroll-based effects and animations
 */
function initScrollEffects() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate featured chalets on scroll
    gsap.utils.toArray('.featured-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Animate features section on scroll
    gsap.from(".feature-card", {
        scrollTrigger: {
            trigger: ".features-section",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Parallax effect for background images
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, {
            scrollTrigger: {
                trigger: bg,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -100,
            ease: "none"
        });
    });
}

/**
 * Add event listeners for interactive elements
 */
function addEventListeners() {
    // Gallery image click for lightbox effect (if available)
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // If a lightbox library is used, initialize it here
            // For example: openLightbox(this.src);
        });
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateBookingForm();
        });
    }
}

/**
 * Validate booking form inputs
 */
function validateBookingForm() {
    const form = document.getElementById('booking-form');
    let isValid = true;
    
    // Get form fields
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const checkIn = form.querySelector('#check-in');
    const checkOut = form.querySelector('#check-out');
    const guests = form.querySelector('#guests');
    
    // Simple validation
    if (name && name.value.trim() === '') {
        showError(name, 'الرجاء إدخال الاسم');
        isValid = false;
    }
    
    if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
        showError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    if (phone && !/^\d{10,}$/.test(phone.value.replace(/\D/g, ''))) {
        showError(phone, 'الرجاء إدخال رقم هاتف صحيح');
        isValid = false;
    }
    
    if (checkIn && checkIn.value === '') {
        showError(checkIn, 'الرجاء اختيار تاريخ الوصول');
        isValid = false;
    }
    
    if (checkOut && checkOut.value === '') {
        showError(checkOut, 'الرجاء اختيار تاريخ المغادرة');
        isValid = false;
    }
    
    // If form is valid, submit or show success message
    if (isValid) {
        // Here you would typically send the form data to a server
        // For demo purposes, just show a success message
        showBookingSuccess();
    }
}

/**
 * Show error message for form field
 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    
    input.classList.add('border-red-500');
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorElement.textContent = '';
        input.classList.remove('border-red-500');
    }, 3000);
}

/**
 * Show booking success message
 */
function showBookingSuccess() {
    const form = document.getElementById('booking-form');
    const successMessage = document.createElement('div');
    
    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
    successMessage.innerHTML = `
        <strong class="font-bold">تم إرسال طلب الحجز بنجاح!</strong>
        <span class="block sm:inline"> سنتواصل معك قريباً لتأكيد الحجز.</span>
    `;
    
    form.reset();
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Initialize image gallery with lightbox effect
 */
function initGallery() {
    // This function would initialize a lightbox library if used
    // For example: 
    // lightbox.option({
    //     'resizeDuration': 200,
    //     'wrapAround': true
    // });
}

/**
 * Initialize Google Maps
 */
function initMap() {
    // This function would initialize Google Maps if used
    // For example:
    // const mapElement = document.getElementById('location-map');
    // const map = new google.maps.Map(mapElement, {
    //     center: { lat: 24.7136, lng: 46.6753 }, // Example coordinates
    //     zoom: 15
    // });
    // const marker = new google.maps.Marker({
    //     position: { lat: 24.7136, lng: 46.6753 },
    //     map: map,
    //     title: 'شاليهات المزرعة'
    // });
}

// Weather widget functionality (if needed)
function fetchWeather() {
    // This would fetch weather data from an API
    // For example:
    // fetch('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=Dammam&days=3')
    //     .then(response => response.json())
    //     .then(data => {
    //         updateWeatherWidget(data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching weather data:', error);
    //     });
}

// Update weather widget with fetched data
function updateWeatherWidget(data) {
    // Update the weather widget with the fetched data
    // const weatherWidget = document.getElementById('weather-widget');
    // if (weatherWidget && data) {
    //     // Update widget content
    // }
}