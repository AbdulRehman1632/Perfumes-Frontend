// import React, { useRef, useEffect } from "react";

// const MouseTrail = () => {
//   const canvasRef = useRef(null);
//   const particles = [];

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener("resize", handleResize);

//     const colors = [ "#ab572d8a", "rgba(124, 67, 13, 0.73)ff", "rgba(59, 31, 4, 0.57)ff", "#ab572d8e"];

//     class Particle {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.size = Math.random() * 6 + 2;
//         this.color = colors[Math.floor(Math.random() * colors.length)];
//         this.life = 100;
//       }

//       update() {
//         this.size *= 0.96;
//         this.life--;
//       }

//       draw(ctx) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//       }
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((p, index) => {
//         p.update();
//         p.draw(ctx);
//         if (p.life <= 0 || p.size <= 0.5) {
//           particles.splice(index, 1);
//         }
//       });

//       requestAnimationFrame(animate);
//     };

//     const addParticles = (e) => {
//       for (let i = 0; i < 5; i++) {
//         particles.push(new Particle(e.clientX, e.clientY));
//       }
//     };

//     window.addEventListener("mousemove", addParticles);
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", addParticles);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 9999,
//         pointerEvents: "none",
//       }}
//     />
//   );
// };

// export default MouseTrail;



// import React, { useEffect, useRef } from 'react';

// const MouseTrail = () => {
//   const canvasRef = useRef(null);
//   const particles = [];

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const colors = ['#FF3CAC', '#784BA0', '#2B86C5', '#00F0FF', '#FFB400'];

//     const createParticle = (x, y) => {
//       particles.push({
//         x,
//         y,
//         radius: Math.random() * 5 + 2,
//         color: colors[Math.floor(Math.random() * colors.length)],
//         alpha: 1,
//         dx: (Math.random() - 0.5) * 3,
//         dy: (Math.random() - 0.5) * 3
//       });
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p, i) => {
//         p.x += p.dx;
//         p.y += p.dy;
//         p.alpha -= 0.01;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//         ctx.fillStyle = p.color;
//         ctx.globalAlpha = p.alpha;
//         ctx.fill();
//         ctx.globalAlpha = 1;

//         if (p.alpha <= 0) particles.splice(i, 1);
//       });
//       requestAnimationFrame(animate);
//     };

//     const handleMouseMove = (e) => {
//       for (let i = 0; i < 5; i++) {
//         createParticle(e.clientX, e.clientY);
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     animate();

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         pointerEvents: 'none',
//         zIndex: 9999,
//       }}
//     />
//   );
// };

// export default MouseTrail;




// import React, { useRef, useEffect } from 'react';

// const MouseTrail = () => {
//   const canvasRef = useRef(null);
//   const rays = [];

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     class Ray {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.radius = 0;
//         this.maxRadius = 60 + Math.random() * 30;
//         this.alpha = 0.6;
//         this.lineWidth = 1 + Math.random() * 2;
//       }
//       update() {
//         this.radius += 2;
//         this.alpha -= 0.015;
//       }
//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
//         ctx.lineWidth = this.lineWidth;
//         ctx.stroke();
//       }
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       rays.forEach((r, i) => {
//         r.update();
//         r.draw();
//         if (r.alpha <= 0 || r.radius > r.maxRadius) {
//           rays.splice(i, 1);
//         }
//       });
//       requestAnimationFrame(animate);
//     };

//     const onMouseMove = (e) => {
//       rays.push(new Ray(e.clientX, e.clientY));
//     };

//     window.addEventListener('mousemove', onMouseMove);
//     animate();

//     return () => {
//       window.removeEventListener('resize', resize);
//       window.removeEventListener('mousemove', onMouseMove);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         pointerEvents: 'none',
//         zIndex: 9999,
//       }}
//     />
//   );
// };

// export default MouseTrail;









