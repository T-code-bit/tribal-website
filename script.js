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
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = 'Toggle Dark Mode';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
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
        clock.textContent = `EAT: ${dateString} ${timeString}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display the clock immediately
});
