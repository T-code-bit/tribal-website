// Wrap entire script in a single DOMContentLoaded event listener to prevent multiple declarations
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Home Section Dynamic Interactions
    const valueCards = document.querySelectorAll('.value-card');
    const featuredProjects = document.querySelectorAll('.featured-project');

    // Value Card Hover Interactions
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-active');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-active');
        });
    });

    // Featured Project Hover Interactions
    featuredProjects.forEach(project => {
        const overlay = project.querySelector('.project-overlay');
        const btn = project.querySelector('.btn');

        project.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            btn.style.transform = 'scale(1.05)';
        });

        project.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            btn.style.transform = 'scale(1)';
        });
    });

    // Dynamic Tech Tags Hover Effect
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.backgroundColor = 'var(--secondary-color)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.backgroundColor = 'rgba(210, 105, 30, 0.7)';
        });
    });

    // Technology Ecosystem Interactions
    const techDiagramContainer = document.querySelector('.tech-diagram-container');
    const techTitle = document.getElementById('tech-title');
    const techDescription = document.getElementById('tech-description');
    const techEcosystemSvg = document.querySelector('.tech-ecosystem-svg');

    // Technology node descriptions
    const techNodeDescriptions = {
        'frontend': {
            title: 'Frontend Technologies',
            description: 'Crafting responsive and interactive user interfaces using modern web technologies.'
        },
        'backend': {
            title: 'Backend Infrastructure',
            description: 'Building robust and scalable server-side solutions with high-performance frameworks.'
        },
        'cloud': {
            title: 'Cloud & DevOps',
            description: 'Implementing cutting-edge cloud solutions for seamless deployment and scaling.'
        },
        'ai': {
            title: 'AI & Machine Learning',
            description: 'Developing intelligent systems that learn and adapt using advanced algorithms.'
        }
    };

    // SVG Interaction
    if (techEcosystemSvg) {
        const svgNodes = techEcosystemSvg.contentDocument.querySelectorAll('.node');
        
        svgNodes.forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                const techType = node.getAttribute('data-tech');
                if (techNodeDescriptions[techType]) {
                    techTitle.textContent = techNodeDescriptions[techType].title;
                    techDescription.textContent = techNodeDescriptions[techType].description;
                }
            });

            node.addEventListener('mouseleave', () => {
                techTitle.textContent = 'Technology Ecosystem';
                techDescription.textContent = 'Hover over nodes to explore our technological capabilities';
            });
        });
    }

    // Tech Cards Interaction
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        const techType = card.getAttribute('data-tech');
        
        card.addEventListener('mouseenter', () => {
            if (techNodeDescriptions[techType]) {
                techTitle.textContent = techNodeDescriptions[techType].title;
                techDescription.textContent = techNodeDescriptions[techType].description;
            }
        });

        card.addEventListener('mouseleave', () => {
            techTitle.textContent = 'Technology Ecosystem';
            techDescription.textContent = 'Hover over nodes to explore our technological capabilities';
        });
    });

    // Advanced Featured Projects Carousel
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectIndicators = document.querySelectorAll('.indicator');
    const prevProjectBtn = document.querySelector('.prev-project');
    const nextProjectBtn = document.querySelector('.next-project');
    const mainProjectDetailsModal = document.getElementById('project-modal');
    const mainProjectDetailsModalBody = mainProjectDetailsModal.querySelector('.modal-body');
    const mainProjectDetailsCloseBtn = mainProjectDetailsModal.querySelector('.modal-close');
    const projectDetailsTriggers = document.querySelectorAll('.project-details-trigger');

    let currentProjectIndex = 0;

    // Project Details
    const projectDetailsData = {
        'ai-analytics': {
            title: 'AI-Powered Analytics Platform',
            fullDescription: `
                <div class="project-modal-content">
                    <h2>AI-Powered Analytics Platform</h2>
                    <div class="project-modal-sections">
                        <div class="project-modal-section">
                            <h3>Project Overview</h3>
                            <p>A revolutionary machine learning platform designed to transform complex data into actionable business insights. By leveraging advanced AI algorithms, we enable businesses to predict market trends, optimize strategies, and make data-driven decisions with unprecedented accuracy.</p>
                        </div>
                        <div class="project-modal-section">
                            <h3>Key Technologies</h3>
                            <ul>
                                <li>TensorFlow</li>
                                <li>Python</li>
                                <li>Scikit-learn</li>
                                <li>Pandas</li>
                                <li>AWS SageMaker</li>
                            </ul>
                        </div>
                        <div class="project-modal-section">
                            <h3>Key Achievements</h3>
                            <ul>
                                <li>95% Predictive Accuracy</li>
                                <li>Real-time Data Processing</li>
                                <li>Reduced Decision-Making Time by 60%</li>
                                <li>Scalable Microservices Architecture</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'cloud-migration': {
            title: 'Enterprise Cloud Transformation',
            fullDescription: `
                <div class="project-modal-content">
                    <h2>Enterprise Cloud Transformation</h2>
                    <div class="project-modal-sections">
                        <div class="project-modal-section">
                            <h3>Project Overview</h3>
                            <p>A comprehensive cloud migration strategy that seamlessly transitions enterprise infrastructure to a scalable, secure, and efficient cloud environment. By utilizing state-of-the-art containerization and orchestration technologies, we enable businesses to achieve unprecedented operational flexibility and cost-effectiveness.</p>
                        </div>
                        <div class="project-modal-section">
                            <h3>Key Technologies</h3>
                            <ul>
                                <li>Kubernetes</li>
                                <li>Docker</li>
                                <li>Terraform</li>
                                <li>AWS EKS</li>
                                <li>Jenkins</li>
                            </ul>
                        </div>
                        <div class="project-modal-section">
                            <h3>Key Achievements</h3>
                            <ul>
                                <li>99.99% Infrastructure Uptime</li>
                                <li>40% Cost Reduction</li>
                                <li>Improved Deployment Speed</li>
                                <li>Enhanced Security Protocols</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Project Carousel Navigation
    function setActiveProject(index) {
        projectSlides.forEach(slide => slide.classList.remove('active'));
        projectIndicators.forEach(indicator => indicator.classList.remove('active'));

        projectSlides[index].classList.add('active');
        projectIndicators[index].classList.add('active');
        currentProjectIndex = index;
    }

    // Next Project
    nextProjectBtn.addEventListener('click', () => {
        const nextIndex = (currentProjectIndex + 1) % projectSlides.length;
        setActiveProject(nextIndex);
    });

    // Previous Project
    prevProjectBtn.addEventListener('click', () => {
        const prevIndex = (currentProjectIndex - 1 + projectSlides.length) % projectSlides.length;
        setActiveProject(prevIndex);
    });

    // Project Indicator Navigation
    projectIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            setActiveProject(index);
        });
    });

    // Project Details Modal
    projectDetailsTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = trigger.getAttribute('data-project');
            const details = projectDetailsData[projectId];

            mainProjectDetailsModalBody.innerHTML = details.fullDescription;
            mainProjectDetailsModal.classList.add('show');
        });
    });

    // Close Modal
    mainProjectDetailsCloseBtn.addEventListener('click', () => {
        mainProjectDetailsModal.classList.remove('show');
    });

    // Close modal when clicking outside
    mainProjectDetailsModal.addEventListener('click', (e) => {
        if (e.target === mainProjectDetailsModal) {
            mainProjectDetailsModal.classList.remove('show');
        }
    });

    // Featured Projects Constellation Interaction
    const featuredProjectNodes = document.querySelectorAll('.project-node');
    const featuredProjectDetailsModal = document.querySelector('.project-details-modal');
    const featuredModalBody = featuredProjectDetailsModal.querySelector('.modal-body');
    const featuredModalCloseBtn = featuredProjectDetailsModal.querySelector('.modal-close');

    // Project Details Configuration
    const projectDetailsConfig = {
        'ai-analytics': {
            title: 'AI-Powered Analytics Platform',
            description: `
                <div class="project-detail-section">
                    <h2>AI Analytics Platform</h2>
                    <div class="project-detail-grid">
                        <div class="project-detail-column">
                            <h3>Project Overview</h3>
                            <p>A cutting-edge machine learning platform that transforms complex data into actionable business insights. By leveraging advanced AI algorithms, we enable businesses to predict market trends, optimize strategies, and make data-driven decisions with unprecedented accuracy.</p>
                        </div>
                        <div class="project-detail-column">
                            <h3>Key Technologies</h3>
                            <ul>
                                <li>TensorFlow</li>
                                <li>Python</li>
                                <li>Scikit-learn</li>
                                <li>Pandas</li>
                                <li>AWS SageMaker</li>
                            </ul>
                        </div>
                        <div class="project-detail-column">
                            <h3>Key Achievements</h3>
                            <ul>
                                <li>95% Predictive Accuracy</li>
                                <li>Real-time Data Processing</li>
                                <li>Reduced Decision-Making Time by 60%</li>
                                <li>Scalable Microservices Architecture</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'cloud-migration': {
            title: 'Enterprise Cloud Transformation',
            description: `
                <div class="project-detail-section">
                    <h2>Enterprise Cloud Migration</h2>
                    <div class="project-detail-grid">
                        <div class="project-detail-column">
                            <h3>Project Overview</h3>
                            <p>A comprehensive cloud migration strategy that seamlessly transitions enterprise infrastructure to a scalable, secure, and efficient cloud environment. By utilizing state-of-the-art containerization and orchestration technologies, we enable businesses to achieve unprecedented operational flexibility and cost-effectiveness.</p>
                        </div>
                        <div class="project-detail-column">
                            <h3>Key Technologies</h3>
                            <ul>
                                <li>Kubernetes</li>
                                <li>Docker</li>
                                <li>Terraform</li>
                                <li>AWS EKS</li>
                                <li>Jenkins</li>
                            </ul>
                        </div>
                        <div class="project-detail-column">
                            <h3>Key Achievements</h3>
                            <ul>
                                <li>99.99% Infrastructure Uptime</li>
                                <li>40% Cost Reduction</li>
                                <li>Improved Deployment Speed</li>
                                <li>Enhanced Security Protocols</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        'blockchain': {
            title: 'Decentralized Blockchain Solutions',
            description: `
                <div class="project-detail-section">
                    <h2>Blockchain Innovation</h2>
                    <div class="project-detail-grid">
                        <div class="project-detail-column">
                            <h3>Project Overview</h3>
                            <p>A revolutionary blockchain platform that provides secure, transparent, and decentralized solutions for enterprise-level challenges. By leveraging cutting-edge blockchain technologies, we create robust, scalable systems that redefine trust and transparency in digital transactions.</p>
                        </div>
                        <div class="project-detail-column">
                            <h3>Key Technologies</h3>
                            <ul>
                                <li>Ethereum</li>
                                <li>Solidity</li>
                                <li>Web3.js</li>
                                <li>Smart Contracts</li>
                                <li>IPFS</li>
                            </ul>
                        </div>
                        <div class="project-detail-column">
                            <h3>Key Achievements</h3>
                            <ul>
                                <li>Secure Transaction Protocols</li>
                                <li>Decentralized Application Development</li>
                                <li>Global Scalability</li>
                                <li>Enhanced Data Integrity</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Particle Trail Effect
    function createParticleTrail(container) {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-trail');
        container.appendChild(particleContainer);

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const colors = ['#2E8B57', '#D2691E', '#4169E1'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);

            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 0,
                duration: 2,
                ease: 'power1.out',
                onComplete: () => {
                    particle.remove();
                }
            });
        }

        const particleInterval = setInterval(createParticle, 100);

        container.addEventListener('mouseleave', () => {
            clearInterval(particleInterval);
            setTimeout(() => {
                particleContainer.innerHTML = '';
            }, 2000);
        });
    }

    // Initialize Particle Trails
    featuredProjectNodes.forEach(node => createParticleTrail(node));

    // Project Exploration
    const projectExploreBtns = document.querySelectorAll('.project-explore-btn');
    
    projectExploreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const projectInfo = projectDetailsConfig[projectId];

            featuredModalBody.innerHTML = projectInfo.description;
            featuredProjectDetailsModal.classList.add('show');

            // Add audio feedback
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
            
            setTimeout(() => {
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, 200);
        });
    });

    // Modal Close Interaction
    featuredModalCloseBtn.addEventListener('click', () => {
        featuredProjectDetailsModal.classList.remove('show');
    });

    featuredProjectDetailsModal.addEventListener('click', (e) => {
        if (e.target === featuredProjectDetailsModal) {
            featuredProjectDetailsModal.classList.remove('show');
        }
    });

    // Touch Interaction Enhancements for Project Nodes
    const projectNodes = document.querySelectorAll('.project-node');
    
    // Touch-friendly interaction for mobile devices
    projectNodes.forEach(node => {
        let touchTimer = null;
        
        node.addEventListener('touchstart', (e) => {
            touchTimer = setTimeout(() => {
                // Long press effect
                node.classList.add('touch-active');
                
                // Trigger flip animation
                const nodeInner = node.querySelector('.project-node-inner');
                nodeInner.style.transform = 'rotateY(180deg)';
            }, 500); // 500ms long press
        });

        node.addEventListener('touchend', () => {
            clearTimeout(touchTimer);
            node.classList.remove('touch-active');
        });

        node.addEventListener('touchcancel', () => {
            clearTimeout(touchTimer);
            node.classList.remove('touch-active');
        });
    });

    // Prevent default touch behaviors that might interfere
    projectNodes.forEach(node => {
        node.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    });

    // Hero Section Interactivity
    // Particle System for Hero Background
    function createParticleSystem() {
        const particlesContainer = document.querySelector('.hero-particles');
        const particlesCount = 100;

        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            
            // Random positioning
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size and opacity
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = Math.random() * 0.7;
            
            // Random color variation
            const colors = ['#2E8B57', '#D2691E', '#4169E1'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);

            // Animate particle
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
                duration: Math.random() * 3 + 2,
                ease: 'power1.out',
                repeat: -1,
                delay: Math.random() * 2
            });
        }
    }

    // Tech Icon Interactions
    function setupTechIconInteractions() {
        const techIcons = document.querySelectorAll('.visual-item');
        
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const tech = icon.getAttribute('data-tech');
                
                // Audio Feedback
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(220 + Math.random() * 100, audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.start();
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
                
                setTimeout(() => {
                    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
                    oscillator.stop(audioContext.currentTime + 0.5);
                }, 200);

                // Visual Feedback
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 10,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
        });
    }

    // Initialize Hero Section Interactions
    createParticleSystem();
    setupTechIconInteractions();

    // Universe Card Interaction
    const universeCard = document.querySelector('.universe-card');
    const universeCardInner = universeCard.querySelector('.universe-card-inner');
    const launchUniverseBtn = universeCard.querySelector('.btn');

    // Particle trail effect for universe card
    function createParticleTrail(element) {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-trail');
        element.appendChild(particleContainer);

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random positioning
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random color variation
            const colors = ['#2E8B57', '#D2691E', '#4169E1'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);

            // Animate particle
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 0,
                duration: 2,
                ease: 'power1.out',
                onComplete: () => {
                    particle.remove();
                }
            });
        }

        // Create particles periodically
        const particleInterval = setInterval(createParticle, 100);

        // Stop creating particles when mouse leaves
        element.addEventListener('mouseleave', () => {
            clearInterval(particleInterval);
            setTimeout(() => {
                particleContainer.innerHTML = '';
            }, 2000);
        });
    }

    // Initialize particle trail
    createParticleTrail(universeCard);

    // Hover and interaction effects
    universeCard.addEventListener('mouseenter', () => {
        universeCardInner.style.transform = 'rotateY(10deg)';
    });

    universeCard.addEventListener('mouseleave', () => {
        universeCardInner.style.transform = 'rotateY(0deg)';
    });

    // Launch Universe Button Effect
    launchUniverseBtn.addEventListener('mouseenter', () => {
        gsap.to(launchUniverseBtn, {
            scale: 1.1,
            rotation: 360,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });

    launchUniverseBtn.addEventListener('mouseleave', () => {
        gsap.to(launchUniverseBtn, {
            scale: 1,
            rotation: 0,
            duration: 0.3
        });
    });

    // Particles.js Configuration
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00f5d4"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Contact Form Submission
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Basic form validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        // Send form data using fetch
        fetch('/submit-form', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                this.reset(); // Reset form
            } else {
                alert('Failed to send message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });

    // Carousel Rotation Function
    function rotateCarousel() {
        const carousel = document.querySelector('.carousel');
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;

        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 5000);
    }

    // Initial display
    rotateCarousel();

    // Rotate every 5 seconds
    const carouselInterval = setInterval(rotateCarousel, 5000);

    // Advanced Scrambled Text Effect with Calligraphy Inspiration
    class ScrambleText {
        constructor(element) {
            this.element = element;
            this.originalText = element.textContent;
            this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            this.calligraphyChars = 'ÀÁÂÃÄÅàáâãäåĀāĂăĄąßƀƁƂƃƄƅ';
            this.update = this.update.bind(this);
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }

        calligraphyChar() {
            return this.calligraphyChars[Math.floor(Math.random() * this.calligraphyChars.length)];
        }

        setText(newText) {
            const length = Math.max(this.element.textContent.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);

            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = this.element.textContent[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        // 30% chance to use a calligraphy-inspired character
                        char = Math.random() < 0.3 ? this.calligraphyChar() : this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.element.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    // Apply Scrambled Text Effect on Page Load
    const typingEffectElements = document.querySelectorAll('.typing-effect');
    
    typingEffectElements.forEach(element => {
        new ScrambleText(element).setText(element.textContent);
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});