document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        
            if (!mainNav.classList.contains('active')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        });
    }

    const setupDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown');
        const isMobile = window.innerWidth <= 768;

        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });

        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');

            link.removeEventListener('mouseenter', handleDesktopEnter);
            link.removeEventListener('mouseleave', handleDesktopLeave);
            dropdown.removeEventListener('mouseenter', handleDesktopEnter);
            dropdown.removeEventListener('mouseleave', handleDesktopLeave);
            link.removeEventListener('click', handleMobileClick);

            if (isMobile) {
                link.addEventListener('click', handleMobileClick);
            } else {
                dropdown.addEventListener('mouseenter', handleDesktopEnter);
                dropdown.addEventListener('mouseleave', handleDesktopLeave);
            }
        });

        function handleDesktopEnter() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'block';
        }

        function handleDesktopLeave() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
        }

        function handleMobileClick(e) {
            e.preventDefault();
            const menu = this.closest('.dropdown').querySelector('.dropdown-menu');
            if (menu) {
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.display = 'none';
                    }
                });
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            }
        }
    };

    setupDropdowns();

    window.addEventListener('resize', setupDropdowns);

    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'none';
                }
            });
        }
    });

    const navLinks = document.querySelectorAll('.main-nav a:not(.dropdown > a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && mainNav) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });

    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
            currentTestimonial = index;
        }

        prevBtn.addEventListener('click', function() {
            let newIndex = currentTestimonial - 1;
            if (newIndex < 0) {
                newIndex = testimonials.length - 1;
            }
            showTestimonial(newIndex);
        });

        nextBtn.addEventListener('click', function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });

        let testimonialInterval = setInterval(function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        }, 5000);

        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', function() {
                clearInterval(testimonialInterval);
            });

            testimonialSlider.addEventListener('mouseleave', function() {
                testimonialInterval = setInterval(function() {
                    let newIndex = currentTestimonial + 1;
                    if (newIndex >= testimonials.length) {
                        newIndex = 0;
                    }
                    showTestimonial(newIndex);
                }, 5000);
            });
        }
    }

    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    if (addToCartBtns.length > 0 && cartCount) {
        let cartItems = 0;

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                cartItems++;
                cartCount.textContent = cartItems;
                
                this.textContent = 'Added!';
                this.style.backgroundColor = 'green';
                
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.style.backgroundColor = '';
                }, 1000);
            });
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value && emailInput.value.includes('@')) {
                alert('Thank you for subscribing! A 10% discount code has been sent to your email.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

function simulateGoogleAnalytics() {
    console.log('Google Analytics tracking initialized for Rebel Cheese website');
}
simulateGoogleAnalytics();