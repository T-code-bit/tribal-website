document.addEventListener('DOMContentLoaded', () => {
    const heroParticlesContainer = document.querySelector('.hero-particles');
    
    if (!heroParticlesContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        
        // Random size
        const size = Math.random() * 50 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        
        heroParticlesContainer.appendChild(particle);
    }

    // Create multiple particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }

    // Regenerate particles on window resize
    window.addEventListener('resize', () => {
        heroParticlesContainer.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            createParticle();
        }
    });
});
