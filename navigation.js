document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('open');
        }
    });

    // Dropdown Toggle for Mobile
    dropdownItems.forEach(item => {
        const dropdownLink = item.querySelector('.nav-link');
        const dropdownMenu = item.querySelector('.dropdown-menu');

        dropdownLink.addEventListener('click', (event) => {
            // Check if on mobile
            if (window.innerWidth <= 768) {
                event.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when switching between them
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Responsive Adjustments
    function handleResponsiveChanges() {
        if (window.innerWidth > 768) {
            // Reset mobile-specific styles for desktop
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('open');
            dropdownItems.forEach(item => item.classList.remove('active'));
        }
    }

    window.addEventListener('resize', handleResponsiveChanges);
});

(function() {
    // Strict mode for better error catching and performance
    'use strict';

    // Performance: Lazy loading and code splitting
    const lazyLoad = {
        modules: {},
        import: function(moduleName) {
            if (!this.modules[moduleName]) {
                this.modules[moduleName] = new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = `${moduleName}.js`;
                    script.onload = () => resolve(window[moduleName]);
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
            return this.modules[moduleName];
        }
    };

    // Accessibility and Performance Utilities
    const A11yUtils = {
        // Trap focus within an element
        trapFocus: function(element) {
            const focusableElements = 
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const firstFocusableElement = element.querySelectorAll(focusableElements)[0];
            const lastFocusableElement = element.querySelectorAll(focusableElements)[
                element.querySelectorAll(focusableElements).length - 1
            ];

            element.addEventListener('keydown', function(e) {
                let isTabPressed = e.key === 'Tab';

                if (!isTabPressed) return;

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            });
        },

        // Add screen reader announcements
        announce: function(message) {
            const announcer = document.getElementById('screen-reader-announcer');
            if (announcer) {
                announcer.textContent = message;
                announcer.setAttribute('aria-live', 'polite');
            }
        }
    };

    // Network Status Management
    const NetworkManager = {
        init: function() {
            this.createStatusIndicator();
            this.bindEvents();
        },

        createStatusIndicator: function() {
            const indicator = document.createElement('div');
            indicator.id = 'network-status';
            indicator.classList.add('network-status-indicator');
            document.body.appendChild(indicator);
        },

        bindEvents: function() {
            window.addEventListener('online', this.handleOnline.bind(this));
            window.addEventListener('offline', this.handleOffline.bind(this));
        },

        handleOnline: function() {
            const indicator = document.getElementById('network-status');
            indicator.textContent = 'Back Online';
            indicator.classList.remove('offline');
            A11yUtils.announce('Internet connection restored');
        },

        handleOffline: function() {
            const indicator = document.getElementById('network-status');
            indicator.textContent = 'No Internet Connection';
            indicator.classList.add('offline');
            A11yUtils.announce('Internet connection lost');
        }
    };

    // Advanced Navigation Controller
    const NavigationController = {
        init: function() {
            this.cacheDOM();
            this.bindEvents();
            this.setupAccessibility();
        },

        cacheDOM: function() {
            this.navContainer = document.querySelector('.main-nav');
            this.navLinks = document.querySelector('.nav-links');
            this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            this.dropdownItems = document.querySelectorAll('.nav-item.dropdown');
        },

        bindEvents: function() {
            // Use event delegation for better performance
            this.navContainer.addEventListener('click', this.handleNavInteraction.bind(this));
            this.navContainer.addEventListener('keydown', this.handleKeyboardNav.bind(this));
            
            // Responsive handling
            window.addEventListener('resize', 
                this.debounce(this.handleResponsiveChanges.bind(this), 200)
            );
        },

        setupAccessibility: function() {
            // Add ARIA attributes
            this.navLinks.setAttribute('role', 'navigation');
            this.navLinks.setAttribute('aria-label', 'Main Navigation');

            this.dropdownItems.forEach(item => {
                const dropdownLink = item.querySelector('.nav-link');
                const dropdownMenu = item.querySelector('.dropdown-menu');

                dropdownLink.setAttribute('aria-haspopup', 'true');
                dropdownLink.setAttribute('aria-expanded', 'false');
                dropdownMenu.setAttribute('role', 'menu');
            });
        },

        handleNavInteraction: function(event) {
            const target = event.target.closest('.nav-link');
            if (!target) return;

            const dropdownParent = target.closest('.dropdown');
            
            if (dropdownParent && window.innerWidth <= 768) {
                event.preventDefault();
                this.toggleDropdown(dropdownParent);
            }
        },

        handleKeyboardNav: function(event) {
            // Keyboard navigation for dropdowns
            if (event.key === 'Enter' || event.key === ' ') {
                const dropdownParent = event.target.closest('.dropdown');
                if (dropdownParent) {
                    event.preventDefault();
                    this.toggleDropdown(dropdownParent);
                }
            }
        },

        toggleDropdown: function(dropdownItem) {
            const isActive = dropdownItem.classList.toggle('active');
            const dropdownLink = dropdownItem.querySelector('.nav-link');
            
            // Update ARIA states
            dropdownLink.setAttribute('aria-expanded', isActive);

            // Close other dropdowns
            this.dropdownItems.forEach(item => {
                if (item !== dropdownItem) {
                    item.classList.remove('active');
                    item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                }
            });
        },

        handleResponsiveChanges: function() {
            if (window.innerWidth > 768) {
                // Reset mobile-specific states
                this.navLinks.classList.remove('active');
                this.dropdownItems.forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                });
            }
        },

        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // Performance Monitoring
    const PerformanceMonitor = {
        init: function() {
            if ('performance' in window) {
                window.addEventListener('load', this.measureLoadTime);
            }
        },

        measureLoadTime: function() {
            const navLoadTime = performance.now();
            console.log(`Navigation initialized in ${navLoadTime.toFixed(2)}ms`);
        }
    };

    // Initialize on DOM Ready
    function initializeNavigation() {
        NetworkManager.init();
        NavigationController.init();
        PerformanceMonitor.init();
    }

    // Use DOMContentLoaded for faster initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        initializeNavigation();
    }
})();
