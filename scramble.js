// Simple scramble effect with special characters
document.addEventListener('DOMContentLoaded', () => {
    class ScrambleText {
        constructor(element) {
            this.element = element;
            this.originalText = element.textContent;
            this.chars = [
                '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 
                '_', '+', '{', '}', '[', ']', '|', '\\', ':', 
                ';', '"', "'", '<', '>', ',', '.', '?', '/', 
                '~', '`', '0', '1', '2', '3', '4', '5', '6', 
                '7', '8', '9'
            ];
        }

        scramble() {
            // Less aggressive scrambling
            const scrambledText = this.originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return char;
                    
                    // Scramble less frequently
                    return Math.random() > 0.85 ? 
                        this.chars[Math.floor(Math.random() * this.chars.length)] : 
                        char;
                })
                .join('');

            this.element.textContent = scrambledText;
        }

        init() {
            // Slower scramble interval
            setInterval(() => this.scramble(), 500);
        }
    }

    // Apply to all elements with scramble-text class
    const scrambleElements = document.querySelectorAll('.scramble-text');
    scrambleElements.forEach(element => {
        const scrambler = new ScrambleText(element);
        scrambler.init();
    });
});
