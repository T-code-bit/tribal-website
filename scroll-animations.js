// Immersive Scroll-Triggered Animations
(function() {
    'use strict';

    console.log('Scroll Animations Script Loaded');

    class ScrollAnimations {
        constructor() {
            console.log('Initializing Scroll Animations');
            this.animationElements = [];
            this.observer = null;
            
            try {
                this.init();
            } catch (error) {
                console.error('Error initializing Scroll Animations:', error);
            }
        }

        init() {
            console.log('Setting up Scroll Animations');
            this.setupAnimationElements();
            this.createIntersectionObserver();
            this.setupParallaxEffects();
            this.setupScrollReveal();
        }

        setupAnimationElements() {
            this.animationElements = [
                ...document.querySelectorAll('.scroll-animate'),
                ...document.querySelectorAll('.hero-visual-grid .visual-item'),
                ...document.querySelectorAll('.tech-card')
            ];
            console.log(`Found ${this.animationElements.length} animation elements`);
        }

        createIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        this.applyAnimations(entry.target);
                    }
                });
            }, options);

            this.animationElements.forEach(el => this.observer.observe(el));
        }

        applyAnimations(element) {
            const animationType = element.dataset.animation || 'fadeIn';
            
            switch(animationType) {
                case 'slideLeft':
                    gsap.from(element, {
                        x: -100,
                        opacity: 0,
                        duration: 1,
                        ease: 'power2.out'
                    });
                    break;
                case 'slideRight':
                    gsap.from(element, {
                        x: 100,
                        opacity: 0,
                        duration: 1,
                        ease: 'power2.out'
                    });
                    break;
                case 'scaleUp':
                    gsap.from(element, {
                        scale: 0.5,
                        opacity: 0,
                        duration: 1,
                        ease: 'elastic.out(1, 0.3)'
                    });
                    break;
                default:
                    gsap.from(element, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: 'power2.out'
                    });
            }
        }

        setupParallaxEffects() {
            const parallaxElements = document.querySelectorAll('.parallax');
            
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.dataset.speed) || 0.5;
                    el.style.transform = `translateY(${scrollPosition * speed}px)`;
                });
            });
        }

        setupScrollReveal() {
            const revealElements = document.querySelectorAll('.reveal');
            
            revealElements.forEach(el => {
                const revealPoint = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (revealPoint < windowHeight) {
                    el.classList.add('visible');
                }
            });

            window.addEventListener('scroll', () => {
                revealElements.forEach(el => {
                    const revealPoint = el.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;

                    if (revealPoint < windowHeight * 0.8) {
                        el.classList.add('visible');
                    }
                });
            });
        }
    }

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Loaded, attempting to initialize Scroll Animations');
        
        // Dynamically load GSAP if not already loaded
        if (typeof gsap === 'undefined') {
            console.log('GSAP not found, attempting to load dynamically');
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
            script.onload = () => new ScrollAnimations();
            script.onerror = () => console.error('Failed to load GSAP');
            document.head.appendChild(script);
        } else {
            new ScrollAnimations();
        }
    });
})();
