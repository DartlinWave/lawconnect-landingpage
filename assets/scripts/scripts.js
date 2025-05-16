document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Testimonials Carousel
    let currentIndex = 0;
    const comments = document.querySelectorAll('.comment-box');
    const totalComments = comments.length;
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    // Determine how many comments to show based on screen width
    function getDisplayCount() {
        if (window.innerWidth >= 1200) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }
    
    function updateCarousel() {
        const displayCount = getDisplayCount();
        const maxIndex = totalComments - displayCount;
        
        // Ensure currentIndex is within bounds
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        // Update the visibility of comments
        comments.forEach((comment, index) => {
            if (index >= currentIndex && index < currentIndex + displayCount) {
                comment.style.display = 'block';
            } else {
                comment.style.display = 'none';
            }
        });
        
        // Update active dot
        const totalDots = dots.length;
        const activeDotIndex = Math.floor(currentIndex / Math.max(1, Math.ceil(totalComments / totalDots)));
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        
        // Update arrow states
        if (leftArrow) leftArrow.classList.toggle('disabled', currentIndex <= 0);
        if (rightArrow) rightArrow.classList.toggle('disabled', currentIndex >= maxIndex);
    }
    
    // Initialize carousel
    if (comments.length > 0) {
        updateCarousel();
        
        // Add event listeners for arrows
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                const displayCount = getDisplayCount();
                const maxIndex = totalComments - displayCount;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }
        
        // Add event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const displayCount = getDisplayCount();
                const dotsCount = dots.length;
                const commentsPerDot = Math.ceil(totalComments / dotsCount);
                currentIndex = Math.min(index * commentsPerDot, totalComments - displayCount);
                updateCarousel();
            });
        });
        
        // Update on window resize
        window.addEventListener('resize', updateCarousel);
    }
    
    // Language Switcher
    function changeLanguage(lang) {
        if (lang === 'es') {
            window.location.href = 'index.html';
        }
        if (lang === 'en') {
            window.location.href = 'index-en.html';
        }
    }
    
    // Make changeLanguage function globally available
    window.changeLanguage = changeLanguage;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 110, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefits-card, .team-card, .comment-box, .video-wrapper');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.benefits-card, .team-card, .comment-box, .video-wrapper').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add animation class
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form validation
    const contactForm = document.querySelector('.contact-us-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Here you would normally send the form data to a server
                alert('¡Gracias por contactarnos! Te responderemos pronto.');
                contactForm.reset();
            } else {
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    }
});