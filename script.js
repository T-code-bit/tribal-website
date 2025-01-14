document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show and hide sections based on navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Initially hide all sections except the hero section
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Greeting based on time
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const timeNow = new Date().getHours();
        const greeting = document.createElement('p');
        greeting.style.fontSize = '1.4em';
        greeting.style.color = '#fff';

        if (timeNow < 12) {
            greeting.textContent = 'Good Morning! Ready to explore?';
        } else if (timeNow < 18) {
            greeting.textContent = 'Good Afternoon! Let\'s dive in!';
        } else {
            greeting.textContent = 'Good Evening! Take a look around!';
        }

        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.appendChild(greeting);
        }
    }

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const darkModeIcon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    // Typing Effect
    const typingText = document.querySelector('.hero-content h1');
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();

    // Live Clock for East African Time
    const clock = document.createElement('div');
    clock.classList.add('clock');
    document.body.appendChild(clock);

    function updateClock() {
        const now = new Date();
        const options = { timeZone: 'Africa/Nairobi', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        const dateString = now.toLocaleDateString('en-US', options);
        clock.textContent = `WELCOME TO TRIBAL WEBSITE THE TIME IS: ${dateString} ${timeString}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display the clock immediately

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
        } else {
            alert('Message sent successfully!');
            contactForm.reset();
        }
    });

    // AI Assistant Implementation
    const aiButton = document.createElement('button');
    aiButton.innerHTML = '<i class="fas fa-robot"></i>';
    aiButton.classList.add('ai-assistant-button');
    document.body.appendChild(aiButton);

    const aiChat = document.createElement('div');
    aiChat.classList.add('ai-chat');
    aiChat.innerHTML = `
        <div class="ai-chat-header">
            Website Assistant
            <button class="ai-close">&times;</button>
        </div>
        <div class="ai-chat-messages"></div>
        <input type="text" class="ai-chat-input" placeholder="Ask me about the website...">
    `;
    aiChat.style.display = 'none';
    document.body.appendChild(aiChat);

    const responses = {
        'home': 'You can find our main content in the Hero section at the top of the page.',
        'about': 'The About section contains information about our organization and mission.',
        'contact': 'You can reach us through the Contact form at the bottom of the page.',
        'help': 'I can help you navigate the website. Try asking about specific sections like "home", "about", or "contact".',
        'dark mode': 'You can toggle dark mode using the moon/sun icon in the top right corner.',
        'default': 'I\'m here to help! Ask me about any section of the website.'
    };

    aiButton.addEventListener('click', () => {
        aiChat.style.display = aiChat.style.display === 'none' ? 'flex' : 'none';
    });

    const closeButton = aiChat.querySelector('.ai-close');
    closeButton.addEventListener('click', () => {
        aiChat.style.display = 'none';
    });

    const chatMessages = aiChat.querySelector('.ai-chat-messages');
    const chatInput = aiChat.querySelector('.ai-chat-input');

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('ai-message', isUser ? 'user-message' : 'assistant-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userMessage = chatInput.value.trim().toLowerCase();
            addMessage(chatInput.value, true);
            
            let response = responses.default;
            Object.keys(responses).forEach(key => {
                if (userMessage.includes(key)) {
                    response = responses[key];
                }
            });
            
            setTimeout(() => addMessage(response), 500);
            chatInput.value = '';
        }
    });

    // Add initial greeting
    setTimeout(() => addMessage('Hello! How can I help you navigate the website?'), 1000);
});
