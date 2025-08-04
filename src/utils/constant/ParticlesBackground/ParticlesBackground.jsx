import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // ✅ use slim
import { useCallback } from "react";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // ✅ use loadSlim
  }, []);

  return (
     <div
      style={{
        position: "fixed", // 👈 stays behind all content
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // 👈 sends it behind everything
      }}
    >
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#000", // 🔲 background color
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          color: {
            value: "#fff",
          },
          links: {
            color:  ["#AB572D", "#fe9e4fff", "#8b431eff", "#e76321ff"],
            enable: true,
            distance: 150,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
    </div>
  );
};

export default ParticlesBackground;
