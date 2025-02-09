// Advanced Technology Constellation Visualization
(function() {
    'use strict';

    console.log('Tech Constellation Script Loaded');

    class TechConstellation {
        constructor(containerId) {
            console.log(`Initializing Tech Constellation with container: ${containerId}`);
            this.container = document.getElementById(containerId);
            
            if (!this.container) {
                console.error(`Container with ID ${containerId} not found!`);
                return;
            }

            this.width = this.container.clientWidth || 800;
            this.height = 500;
            this.svg = null;
            this.simulation = null;
            this.technologies = [
                { id: 'AI', category: 'Intelligence', icon: 'brain', color: '#FF6B6B' },
                { id: 'Cloud', category: 'Infrastructure', icon: 'cloud', color: '#4ECDC4' },
                { id: 'Blockchain', category: 'Security', icon: 'link', color: '#45B7D1' },
                { id: 'WebTech', category: 'Frontend', icon: 'globe', color: '#FDCB6E' },
                { id: 'DataScience', category: 'Analytics', icon: 'chart-line', color: '#6C5CE7' }
            ];
            this.links = [
                { source: 'AI', target: 'Cloud', strength: 0.7 },
                { source: 'Blockchain', target: 'WebTech', strength: 0.5 },
                { source: 'AI', target: 'DataScience', strength: 0.6 },
                { source: 'Cloud', target: 'Blockchain', strength: 0.4 }
            ];
        }

        init() {
            console.log('Initializing Tech Constellation');
            if (!this.container) return;

            try {
                this.createSVG();
                this.setupSimulation();
                this.renderNodes();
                this.renderLinks();
                this.addInteractivity();
            } catch (error) {
                console.error('Error initializing Tech Constellation:', error);
            }
        }

        createSVG() {
            this.svg = d3.select(this.container)
                .append('svg')
                .attr('width', this.width)
                .attr('height', this.height)
                .style('background', 'rgba(26, 26, 26, 0.8)')
                .style('border-radius', '10px');
        }

        setupSimulation() {
            this.simulation = d3.forceSimulation(this.technologies)
                .force('charge', d3.forceManyBody().strength(-200))
                .force('center', d3.forceCenter(this.width / 2, this.height / 2))
                .force('link', d3.forceLink(this.links).distance(100));
        }

        renderNodes() {
            const nodes = this.svg.selectAll('.node')
                .data(this.technologies)
                .enter()
                .append('g')
                .attr('class', 'node')
                .call(d3.drag()
                    .on('start', this.dragstarted.bind(this))
                    .on('drag', this.dragged.bind(this))
                    .on('end', this.dragended.bind(this)));

            nodes.append('circle')
                .attr('r', 40)
                .attr('fill', d => d.color)
                .style('opacity', 0.7);

            nodes.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '.3em')
                .text(d => d.id)
                .style('fill', 'white')
                .style('font-weight', 'bold');

            this.simulation.on('tick', () => {
                nodes.attr('transform', d => `translate(${d.x},${d.y})`);
            });
        }

        renderLinks() {
            this.svg.selectAll('.link')
                .data(this.links)
                .enter()
                .append('line')
                .attr('class', 'link')
                .style('stroke', '#555')
                .style('stroke-width', 2)
                .style('opacity', 0.5);
        }

        addInteractivity() {
            const tooltip = d3.select('body')
                .append('div')
                .style('position', 'absolute')
                .style('background', 'rgba(0,0,0,0.8)')
                .style('color', 'white')
                .style('padding', '10px')
                .style('border-radius', '5px')
                .style('display', 'none');

            this.svg.selectAll('.node')
                .on('mouseover', (event, d) => {
                    tooltip.style('display', 'block')
                        .html(`
                            <strong>${d.id}</strong><br>
                            Category: ${d.category}
                        `)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 10) + 'px');
                })
                .on('mouseout', () => {
                    tooltip.style('display', 'none');
                });
        }

        dragstarted(event, d) {
            if (!event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        dragended(event, d) {
            if (!event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    // Initialize on DOM load with additional error handling
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Loaded, attempting to initialize Tech Constellation');
        
        // Fallback if D3 is not loaded
        if (typeof d3 === 'undefined') {
            console.error('D3.js is not loaded!');
            return;
        }

        const constellation = new TechConstellation('tech-constellation');
        constellation.init();
    });
})();
