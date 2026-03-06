/* main.js - Core Interactions */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Form Submission Mock
    const communityForm = document.getElementById('communityForm');
    if (communityForm) {
        communityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = communityForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Transmitting...';
            btn.style.background = 'linear-gradient(45deg, #00f2fe, #4facfe)';
            
            // Simulate network request
            setTimeout(() => {
                communityForm.innerHTML = '<div class="success-message" style="text-align: center; padding: 2rem;"><h3 style="color: var(--accent-teal)">Transmission Received!</h3><p>Your frequency signature has been logged in our quantum databases.</p></div>';
            }, 1500);
        });
    }

    // 5. Add floating animation to random elements for aesthetic
    document.querySelectorAll('.theory-item, .blog-post').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('float-anim');
        } else {
            el.classList.add('float-anim-alt');
        }
    });
});
