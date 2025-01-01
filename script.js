// Initialize GSAP animation for the welcome page content
document.addEventListener("DOMContentLoaded", function() {
    // Fade in the welcome page elements with GSAP
    gsap.from("#welcome-message", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".welcome-content p", { opacity: 0, x: -50, duration: 1, delay: 0.5 });
    gsap.from(".preview", { opacity: 0, scale: 0.8, stagger: 0.2, duration: 1, delay: 1 });
    gsap.from(".enter-btn", { opacity: 0, y: 50, duration: 1, delay: 1.5 });
});

// Handle the "Greet Me" button click
document.getElementById('greet-btn').addEventListener('click', function() {
    const userName = document.getElementById('user-name').value.trim();
    
    if (userName) {
        // Display personalized greeting
        const welcomeMessage = `Welcome to TRIBAL WEBSITE, ${userName}!`;
        document.getElementById('welcome-message').textContent = welcomeMessage;
        
        // Animate the greeting change
        gsap.from("#welcome-message", { opacity: 0, y: -50, duration: 1 });
        
        // Hide the personalized greeting input form and show the "Enter Website" button
        document.getElementById('personalized-greeting').style.display = 'none';
        document.getElementById('enter-btn').style.display = 'inline-block';
    } else {
        alert("Please enter your name!");
    }
});

// Handle the "Enter Website" button click
document.getElementById('enter-btn').addEventListener('click', function() {
    // Fade out the welcome page using GSAP
    gsap.to("#welcome-page", { opacity: 0, duration: 1 });
    
    // After the fade-out transition, hide the welcome page and show the main content
    setTimeout(function() {
        document.getElementById('welcome-page').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 1000); // Timeout to match the fade-out transition duration
});

// Handle Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();
        if (response.status === 200) {
            alert('Message sent successfully');
        } else {
            alert('Error sending message: ' + data.error);
        }
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }
});

// Toggle the navigation menu for mobile devices
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const currentDisplay = navMenu.style.display;

    if (currentDisplay === 'none' || currentDisplay === '') {
        navMenu.style.display = 'flex'; // Show the menu
    } else {
        navMenu.style.display = 'none'; // Hide the menu
    }
}
