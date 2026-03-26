/**
 * Hair's K3 Martial Arts - Main JavaScript
 * Handles: Navigation scroll behavior, smooth scrolling, mobile menu,
 * active nav highlighting, back-to-top button, and AOS initialization.
 */

(function () {
    'use strict';

    /* ============================================================
       Configuration
       ============================================================ */
    const CONFIG = {
        navScrollThreshold: 50,
        activeNavOffset: 120,
        backToTopThreshold: 400,
        scrollDebounceMs: 10,
    };

    /* ============================================================
       DOM References
       ============================================================ */
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-k3 .nav-link[href^="#"]');
    const navCollapse = document.getElementById('navbarNav');
    const backToTopBtn = document.getElementById('backToTop');
    const bsCollapse = navCollapse
        ? new bootstrap.Collapse(navCollapse, { toggle: false })
        : null;

    /* ============================================================
       Navigation: Scroll-based styling
       ============================================================ */
    function updateNavbarOnScroll() {
        if (!navbar) return;
        if (window.scrollY > CONFIG.navScrollThreshold) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    /* ============================================================
       Navigation: Active section highlighting
       ============================================================ */
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + CONFIG.activeNavOffset;
        let currentSection = '';

        navLinks.forEach(function (link) {
            const sectionId = link.getAttribute('href');
            if (sectionId === '#') return;
            const section = document.querySelector(sectionId);
            if (!section) return;

            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    /* ============================================================
       Navigation: Close mobile menu on link click
       ============================================================ */
    function closeMobileMenu() {
        if (navCollapse && navCollapse.classList.contains('show') && bsCollapse) {
            bsCollapse.hide();
        }
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    /* ============================================================
       Back to Top Button
       ============================================================ */
    function updateBackToTop() {
        if (!backToTopBtn) return;
        if (window.scrollY > CONFIG.backToTopThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       Scroll Handler (debounced with rAF)
       ============================================================ */
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateNavbarOnScroll();
                updateActiveNavLink();
                updateBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* ============================================================
       Smooth Scroll for anchor links
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    /* ============================================================
       Hero Scroll Indicator
       ============================================================ */
    var scrollIndicator = document.querySelector('.hero__scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            var aboutSection = document.getElementById('about');
            if (aboutSection) {
                var navHeight = navbar ? navbar.offsetHeight : 0;
                var position =
                    aboutSection.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    }

    /* ============================================================
       AOS (Animate on Scroll) Initialization
       ============================================================ */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: function () {
                return window.matchMedia('(prefers-reduced-motion: reduce)')
                    .matches;
            },
        });
    }

    /* ============================================================
       Contact Form Handler (placeholder)
       ============================================================ */
    var contactForm = document.getElementById('contactForm');
    var formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            var formData = new FormData(contactForm);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            // Placeholder: In production, send data to a backend endpoint
            console.log('Contact form submitted:', data);

            // Update aria-live region for accessibility
            if (formStatus) {
                formStatus.textContent = 'Your message has been sent successfully. We will get back to you soon.';
            }

            // Show a simple success message
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.innerHTML =
                '<i class="fas fa-check me-2"></i>Message Sent!';
            submitBtn.disabled = true;
            submitBtn.classList.remove('btn-k3--primary');
            submitBtn.style.backgroundColor = '#2E7D32';
            submitBtn.style.borderColor = '#2E7D32';

            setTimeout(function () {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.add('btn-k3--primary');
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
                contactForm.reset();

                // Clear the status message after reset
                if (formStatus) {
                    formStatus.textContent = '';
                }
            }, 3000);
        });
    }

    /* ============================================================
       Copyright Year
       ============================================================ */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ============================================================
       Initial State
       ============================================================ */
    updateNavbarOnScroll();
    updateActiveNavLink();
    updateBackToTop();
})();
