'use client';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useMemo } from "react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
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
        value: "#000000",
      },
      opacity: 1,
    },
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        resize: {
          delay: 0.5,
          enable: true,
        },
      },
      modes: {},
    },
    particles: {
      color: {
        value: "#fff",
      },
      move: {
        direction: "right",
        enable: true,
        speed: 2,  // Slower movement for the dots
        outModes: {
          default: "out",
        },
      },
      number: {
        density: {
          enable: true,
          area: 1080,
        },
        value: 150,  // Number of dots
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",  // These are your dots
      },
      size: {
        value: 3,
      },
      zIndex: {
        value: 5,
      },
    },
    emitters: {
      autoPlay: true,
      fill: true,
      life: {
        wait: false,
      },
      rate: {
        quantity: 1,
        delay: 7,
      },
      shape: {
        type: "square",
      },
      startCount: 0,
      size: {
        mode: "percent",
        height: 0,
        width: 0,
      },
      particles: {
        shape: {
          type: "image",
          options: {
            image: {
              src: "https://particles.js.org/images/cyan_amongus.png",
              width: 500,
              height: 634,
            },
          },
        },
        size: {
          value: 40,
        },
        move: {
          speed: 10,
          outModes: {
            default: "none",
            right: "destroy",
          },
          straight: true,
        },
        zIndex: {
          value: 0,
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 10,
            sync: true,
          },
        },
      },
      position: {
        x: -5,
        y: 55,
      },
    },
  }), []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        init={initParticlesEngine}
        loaded={particlesLoaded}
      />
    );
  }

  return null;
};

export default ParticlesBackground;
