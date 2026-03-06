/* particles.js - Cosmic Energy Network Background */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Mouse Interaction (Anti-Gravity repeller)
    const mouse = {
        x: null,
        y: null,
        radius: 150 // Radius of anti-gravity effect
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Particles move very slowly (cosmic drift)
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            // Colors: faint teal or purple for deep space vibe
            this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(142, 45, 226, ';
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.fill();

            // Add slight glowing effect to larger stars
            if (this.size > 1.5) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color.replace('rgba', 'rgb').replace(', ', ')').replace(',', ')');
            } else {
                ctx.shadowBlur = 0;
            }
        }

        update() {
            // Anti-Gravity Field Logic
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Repel particles that get too close to the mouse (Anti-gravity)
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    // Force relates to distance
                    const force = (mouse.radius - distance) / mouse.radius;

                    this.x -= forceDirectionX * force * 5;
                    this.y -= forceDirectionY * force * 5;
                }
            }

            // Normal drift
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
    }

    // Initialize particles based on screen size
    function init() {
        particles = [];
        const numParticles = Math.min((width * height) / 10000, 150);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Connect close particles with "Quantum Energy Strings"
    function drawConnections() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx * dx + dy * dy;

                // If close enough, draw line
                if (distance < 15000) {
                    let opacity = 1 - (distance / 15000);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(142, 45, 226, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        drawConnections();

        requestAnimationFrame(animate);
    }

    init();
    animate();
});
