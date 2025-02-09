// Ensure global logging
window.particleNetworkDebug = true;

class ParticleNetwork {
    constructor(canvasId, options = {}) {
        console.log(`[ParticleNetwork] Initializing with canvas: ${canvasId}`);
        
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`[ParticleNetwork] Canvas not found: ${canvasId}`);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: options.mouseRadius || 150 };
        
        // Customizable options
        this.particleCount = options.particleCount || 150;
        this.particleColor = options.particleColor || 'rgba(52, 152, 219, 0.5)';
        this.connectionDistance = options.connectionDistance || 120;

        this.init();
    }

    init() {
        console.log('[ParticleNetwork] Initializing network');
        
        // Resize canvas to parent container or full window
        const parent = this.canvas.parentElement || document.body;
        this.canvas.width = parent.clientWidth || window.innerWidth;
        this.canvas.height = parent.clientHeight || window.innerHeight;
        
        // Ensure visibility
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this));
        }

        console.log(`[ParticleNetwork] Created ${this.particles.length} particles`);

        // Event listeners
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });

        window.addEventListener('resize', () => {
            const parent = this.canvas.parentElement || document.body;
            this.canvas.width = parent.clientWidth || window.innerWidth;
            this.canvas.height = parent.clientHeight || window.innerHeight;
        });

        // Start animation
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw connections
        for (let particle of this.particles) {
            particle.update();
            particle.draw();
        }

        // Connect nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                this.connectParticles(this.particles[i], this.particles[j]);
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    connectParticles(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(52, 152, 219, ${1 - distance / this.connectionDistance})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        }
    }
}

class Particle {
    constructor(network) {
        this.network = network;
        this.x = Math.random() * network.canvas.width;
        this.y = Math.random() * network.canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = network.particleColor;
    }

    update() {
        // Boundary check
        if (this.x + this.size > this.network.canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > this.network.canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        let dx = this.network.mouse.x - this.x;
        let dy = this.network.mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.network.mouse.radius) {
            this.x += dx / distance * 2;
            this.y += dy / distance * 2;
        }
    }

    draw() {
        this.network.ctx.beginPath();
        this.network.ctx.fillStyle = this.color;
        this.network.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.network.ctx.fill();
    }
}
