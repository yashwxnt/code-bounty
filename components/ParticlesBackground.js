'use client';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => ({
    background: {
      color: {
        value: "#000000"
      }
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: false,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        }
      }
    },
    particles: {
      number: {
        value: 1000,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#ffffff", "#000000"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 3, // Adjusted speed
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    detectRetina: true,
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    autoPlay: true,
    backgroundMask: {
      enable: false
    },
    duration: 0,
    zIndex: 0
  }), []);

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
