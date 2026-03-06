/* solar-system.js - Animated Solar System in Hero Section */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('solar-system-container');
    if (!container) return;

    // Center focal point (The Sun or Central Gravity Node)
    const sun = document.createElement('div');
    sun.className = 'planet-icon sun glow-box';
    sun.style.position = 'absolute';
    sun.style.top = '50%';
    sun.style.left = '50%';
    sun.style.transform = 'translate(-50%, -50%)';
    sun.style.width = '100px';
    sun.style.height = '100px';
    sun.style.zIndex = '10';
    container.appendChild(sun);

    // Planet Definitions
    const planets = [
        { name: 'mercury', radius: 100, size: 10, speed: 8, color: '#b0bec5' },
        { name: 'venus', radius: 150, size: 15, speed: 12, color: '#ffe082' },
        { name: 'earth', radius: 210, size: 18, speed: 16, color: '#4fc3f7' },
        { name: 'mars', radius: 270, size: 14, speed: 20, color: '#ff8a65' },
        { name: 'jupiter', radius: 360, size: 30, speed: 30, color: '#ffcc80' } // Reduced orbit sizes to fit in screen
    ];

    planets.forEach((planet, index) => {
        // Orbit Path Ring
        const ring = document.createElement('div');
        ring.className = 'orbit-ring';
        ring.style.width = `${planet.radius * 2}px`;
        ring.style.height = `${planet.radius * 2}px`;

        // Tilt the whole system slightly for a 3D isometric look
        ring.style.transform = 'translate(-50%, -50%) rotateX(60deg) rotateY(-10deg)';
        ring.style.transformStyle = 'preserve-3d';

        // Orbiter wrapper holding the planet
        const orbiter = document.createElement('div');
        orbiter.className = 'planet-orbiter';
        orbiter.style.animationDuration = `${planet.speed}s`;

        // Reverse orbit for alternating planets just for visual flair
        if (index % 2 !== 0) {
            orbiter.style.animationDirection = 'reverse';
        }

        // The actual planet sphere
        const sphere = document.createElement('div');
        sphere.className = 'planet-sphere';
        sphere.style.width = `${planet.size}px`;
        sphere.style.height = `${planet.size}px`;
        sphere.style.background = `radial-gradient(circle at 30% 30%, #fff, ${planet.color})`;
        sphere.style.boxShadow = `0 0 15px ${planet.color}80`;

        // Counter-rotate the sphere so shadow stays consistent and it doesn't flatten due to 3D tilt
        sphere.style.transform = 'rotateX(-60deg) rotateY(10deg)';

        orbiter.appendChild(sphere);
        ring.appendChild(orbiter);
        container.appendChild(ring);
    });

    // Add CSS for 3D preservation
    container.style.perspective = '1000px';
});
