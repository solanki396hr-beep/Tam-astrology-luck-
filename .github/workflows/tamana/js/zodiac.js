/* zodiac.js - Interactive Zodiac Wheel Chart */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('zodiac-wheel-app');
    if (!container) return;

    // Create a simple SVG based Zodiac wheel
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 500 500');
    svg.style.filter = 'drop-shadow(0 0 20px rgba(142,45,226,0.3))';

    // Outer Ring (Ecliptic)
    const outerRing = document.createElementNS(svgNS, "circle");
    outerRing.setAttribute('cx', '250');
    outerRing.setAttribute('cy', '250');
    outerRing.setAttribute('r', '220');
    outerRing.setAttribute('fill', 'none');
    outerRing.setAttribute('stroke', 'var(--glass-border)');
    outerRing.setAttribute('stroke-width', '2');
    svg.appendChild(outerRing);

    // Inner Ring
    const innerRing = document.createElementNS(svgNS, "circle");
    innerRing.setAttribute('cx', '250');
    innerRing.setAttribute('cy', '250');
    innerRing.setAttribute('r', '140');
    innerRing.setAttribute('fill', 'none');
    innerRing.setAttribute('stroke', 'rgba(0, 242, 254, 0.3)');
    innerRing.setAttribute('stroke-width', '1');
    svg.appendChild(innerRing);

    // Center Core (The Anti-Gravity Node)
    const core = document.createElementNS(svgNS, "circle");
    core.setAttribute('cx', '250');
    core.setAttribute('cy', '250');
    core.setAttribute('r', '30');
    core.setAttribute('fill', 'url(#coreGradient)');
    svg.appendChild(core);

    // Gradient Definition
    const defs = document.createElementNS(svgNS, "defs");
    defs.innerHTML = `
        <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.9" />
            <stop offset="50%" stop-color="var(--accent-teal)" stop-opacity="0.6" />
            <stop offset="100%" stop-color="var(--bg-deep-space)" stop-opacity="0.1" />
        </radialGradient>
    `;
    svg.appendChild(defs);

    // 12 Zodiac Houses / Anti-Gravity Nodes
    const gHouses = document.createElementNS(svgNS, "g");
    gHouses.classList.add('spin-slow-reverse'); // Rotate slowly
    gHouses.style.transformOrigin = "250px 250px";

    const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    const radius = 180;

    for (let i = 0; i < 12; i++) {
        // Calculate angle
        const angle = (i * 30 - 90) * (Math.PI / 180);

        // Draw dividing lines
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute('x1', '250');
        line.setAttribute('y1', '250');
        line.setAttribute('x2', 250 + 220 * Math.cos(angle + (15 * Math.PI / 180)));
        line.setAttribute('y2', 250 + 220 * Math.sin(angle + (15 * Math.PI / 180)));
        line.setAttribute('stroke', 'var(--glass-border)');
        line.setAttribute('stroke-dasharray', '5,5');
        gHouses.appendChild(line);

        // Position text
        const x = 250 + radius * Math.cos(angle);
        const y = 250 + radius * Math.sin(angle);

        const text = document.createElementNS(svgNS, "text");
        text.setAttribute('x', x);
        text.setAttribute('y', y + 8); // Offset baseline
        text.setAttribute('fill', 'var(--text-muted)');
        text.setAttribute('font-size', '24');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('class', 'zodiac-symbol');
        text.style.cursor = 'pointer';
        text.style.transition = 'all 0.3s';
        text.textContent = signs[i];

        // Interaction (Show energy flow)
        text.addEventListener('mouseenter', () => {
            text.setAttribute('fill', 'var(--accent-teal)');
            text.setAttribute('font-size', '32');
            text.style.filter = 'drop-shadow(0 0 10px var(--accent-teal))';

            // Draw temporary energy line to core
            const energyLine = document.createElementNS(svgNS, "line");
            energyLine.setAttribute('id', 'temp-energy-line');
            energyLine.setAttribute('x1', x);
            energyLine.setAttribute('y1', y);
            energyLine.setAttribute('x2', '250');
            energyLine.setAttribute('y2', '250');
            energyLine.setAttribute('stroke', 'var(--primary-glow)');
            energyLine.setAttribute('stroke-width', '3');
            svg.insertBefore(energyLine, container.firstChild);
        });

        text.addEventListener('mouseleave', () => {
            text.setAttribute('fill', 'var(--text-muted)');
            text.setAttribute('font-size', '24');
            text.style.filter = 'none';
            const temp = document.getElementById('temp-energy-line');
            if (temp) temp.remove();
        });

        gHouses.appendChild(text);
    }

    svg.appendChild(gHouses);

    // Inner planetary dots
    const gPlanets = document.createElementNS(svgNS, "g");
    gPlanets.classList.add('spin-slow'); // Rotate opposite way
    gPlanets.style.transformOrigin = "250px 250px";

    for (let i = 0; i < 7; i++) {
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const pRadius = 70 + Math.random() * 60; // Between 70 and 130

        const planet = document.createElementNS(svgNS, "circle");
        planet.setAttribute('cx', 250 + pRadius * Math.cos(angle));
        planet.setAttribute('cy', 250 + pRadius * Math.sin(angle));
        planet.setAttribute('r', 4 + Math.random() * 6);
        planet.setAttribute('fill', i % 2 === 0 ? 'var(--accent-pink)' : 'var(--primary-glow)');
        planet.setAttribute('class', 'glow-box');
        gPlanets.appendChild(planet);
    }

    svg.appendChild(gPlanets);
    container.appendChild(svg);
});
