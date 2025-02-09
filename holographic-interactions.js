class HolographicInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.createHolographicStyle();
        this.addHolographicEffects();
    }

    createHolographicStyle() {
        const style = document.createElement('style');
        style.textContent = `
            .holographic-element {
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .holographic-element::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(
                    45deg, 
                    rgba(52, 152, 219, 0.1), 
                    rgba(142, 68, 173, 0.1), 
                    rgba(231, 76, 60, 0.1)
                );
                transform: rotate(-45deg);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1;
            }

            .holographic-element:hover::before {
                opacity: 1;
            }

            .holographic-element::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(
                    circle at center, 
                    rgba(255, 255, 255, 0.2), 
                    transparent 70%
                );
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 2;
            }

            .holographic-element:hover::after {
                opacity: 1;
            }

            .holographic-element:hover {
                transform: perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.05);
                box-shadow: 
                    0 10px 20px rgba(52, 152, 219, 0.2),
                    0 -10px 20px rgba(142, 68, 173, 0.2);
            }

            .btn-cyberpunk.holographic-element:hover {
                background: linear-gradient(
                    45deg, 
                    rgba(52, 152, 219, 0.1), 
                    rgba(142, 68, 173, 0.1)
                );
                border-color: rgba(52, 152, 219, 0.5);
            }
        `;
        document.head.appendChild(style);
    }

    addHolographicEffects() {
        const elementsToHolograph = [
            '.btn-cyberpunk', 
            '.value-card', 
            '.featured-project', 
            'nav a', 
            'footer a'
        ];

        elementsToHolograph.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('holographic-element');
                
                // 3D Tilt Effect
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = -(x - centerX) / 20;
                    
                    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HolographicInteractions();
});
