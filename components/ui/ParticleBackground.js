"use client"; // Mark this component as a client component

import { useEffect } from 'react';
import particlesJS from 'particles.js'; // Ensure this is the correct path

const ParticleBackground = () => {
  useEffect(() => {
    // Initialize particlesJS
    if (typeof particlesJS === 'function') {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#800080", // Purple particles
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 5,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#800080",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            out_mode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
          },
        },
        retina_detect: true,
      });
    } else {
      console.error("particlesJS is not defined");
    }
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;