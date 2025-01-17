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
                section.style.display = (section.id === sectionId) ? 'block' : 'none';
            });
        });
    });

    // Initially hide all sections except the hero section
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('hero').style.display = 'block';

    // Greeting based on time
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const timeNow = new Date().getHours();
        const greeting = document.createElement('p');
        greeting.style.fontSize = '1.4em';
        greeting.style.color = '#fff';

        if (timeNow < 12) {
            greeting.textContent = 'Hey Legend, Good Morning! Ready to explore?';
        } else if (timeNow < 18) {
            greeting.textContent = 'Good Afternoon! Let\'s dive in!';
        } else {
            greeting.textContent = 'Good Evening! Take a look around! Had a long day?';
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
        backToTopButton.classList.toggle('show', window.scrollY > 300);
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
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
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

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
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
    }

    // AI Assistant Implementation
    const aiButton = document.createElement('button');
    aiButton.innerHTML = '<img src="robot-head.png" alt="AI Assistant" style="width: 40px; height: 40px;">';
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

// Toggle button for the navigation
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

// FAQ toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
    });
});

// Quotes array
const quotes = [
    "The best way to predict the future is to create it.",
    "You miss 100% of the shots you don't take.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Don't watch the clock; do what it does. Keep going.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Opportunities don't happen. You create them.",
    "Don't be afraid to give up the good to go for the great.",
    "I find that the harder I work, the more luck I seem to have.",
    "The successful warrior is the average man, with laser-like focus.",
    "Success seems to be connected with action. Successful people keep moving.",
    "Small daily improvements over time lead to stunning results.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The way to get started is to quit talking and begin doing.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t let yesterday take up too much of today.",
    "You learn more from failure than from success. Don’t let it stop you.",
    "It’s not whether you get knocked down, it’s whether you get up.",
    "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.",
    "People who are crazy enough to think they can change the world, are the ones who do.",
    "We may encounter many defeats but we must not be defeated.",
    "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
    "Imagine your life is perfect in every respect; what would it look like?"
];

// Function to get a new quote
const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = quotes[randomIndex];
};

// Set a new quote every 2 minutes (120000 milliseconds)
setInterval(getNewQuote, 120000);

// Initial quote
getNewQuote();
