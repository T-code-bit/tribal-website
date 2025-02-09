class AICursor {
    constructor() {
        console.log('[AICursor] Initializing');
        this.cursor = null;
        this.trail = [];
        this.init();
    }

    init() {
        console.log('[AICursor] Creating cursor elements');
        
        // Create cursor element
        this.cursor = document.createElement('div');
        this.cursor.classList.add('ai-cursor');
        document.body.appendChild(this.cursor);

        // Create minimal trail
        for (let i = 0; i < 3; i++) {
            const trailElement = document.createElement('div');
            trailElement.classList.add('ai-cursor-trail');
            document.body.appendChild(trailElement);
            this.trail.push(trailElement);
        }

        // Event listeners
        document.addEventListener('mousemove', this.updateCursor.bind(this));
        document.addEventListener('mouseenter', this.showCursor.bind(this));
        document.addEventListener('mouseleave', this.hideCursor.bind(this));

        // Cursor style
        this.createCursorStyle();
        console.log('[AICursor] Initialization complete');
    }

    createCursorStyle() {
        console.log('[AICursor] Creating cursor style');
        const style = document.createElement('style');
        style.setAttribute('nonce', 'custom-nonce-value'); // Add nonce to bypass CSP
        style.textContent = `
            body { cursor: none; }
            .ai-cursor {
                position: fixed;
                width: 15px;
                height: 15px;
                border: 2px solid #3498db;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: transform 0.1s ease, border-color 0.2s ease;
            }
            .ai-cursor-trail {
                position: fixed;
                width: 8px;
                height: 8px;
                background: rgba(52, 152, 219, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9998;
                transition: transform 0.2s ease;
            }
        `;
        document.head.appendChild(style);
        console.log('[AICursor] Style added to document');
    }

    updateCursor(e) {
        // Main cursor
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;

        // Trail effect with reduced delay
        this.trail.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = `${e.clientX}px`;
                trail.style.top = `${e.clientY}px`;
            }, index * 30);
        });
    }

    showCursor() {
        this.cursor.style.opacity = '1';
        this.trail.forEach(trail => trail.style.opacity = '0.5');
    }

    hideCursor() {
        this.cursor.style.opacity = '0';
        this.trail.forEach(trail => trail.style.opacity = '0');
    }
}

// Force initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('[AICursor] DOM Loaded, creating cursor');
    try {
        new AICursor();
    } catch (error) {
        console.error('[AICursor] Initialization failed:', error);
    }
});
