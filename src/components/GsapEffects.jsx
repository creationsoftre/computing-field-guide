import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

function GsapEffects() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (reducedMotion) {
      return undefined;
    }

    const cleanups = [];

    document.querySelectorAll("[data-gsap-button]").forEach((button) => {
      const enter = () => {
        gsap.to(button, {
          y: -4,
          scale: 1.025,
          duration: 0.3,
          ease: "power3.out",
        });
      };
      const leave = () => {
        gsap.to(button, {
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "elastic.out(1, 0.45)",
        });
      };

      button.addEventListener("pointerenter", enter);
      button.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        button.removeEventListener("pointerenter", enter);
        button.removeEventListener("pointerleave", leave);
      });
    });

    document.querySelectorAll("[data-gsap-card]").forEach((card) => {
      const move = (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(card, {
          rotateY: x * 4,
          rotateX: y * -4,
          y: -6,
          duration: 0.35,
          ease: "power2.out",
          transformPerspective: 900,
        });
      };
      const leave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        });
      };

      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
    });

    if (finePointer && cursorRef.current && trailRef.current) {
      const cursor = cursorRef.current;
      const trailDots = Array.from(trailRef.current.children);
      const moveX = gsap.quickTo(cursor, "x", {
        duration: 0.12,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(cursor, "y", {
        duration: 0.12,
        ease: "power3.out",
      });
      const interactiveSelector =
        "[data-gsap-button], [data-gsap-card], input, a, button";
      let cursorInitialized = false;
      let cursorVisible = false;
      let cursorInteractive = false;
      let particleIndex = 0;
      let lastParticleTime = 0;
      let lastParticleX = 0;
      let lastParticleY = 0;

      gsap.set(trailDots, { opacity: 0, scale: 0.25, force3D: true });

      const emitParticle = (x, y, timestamp) => {
        const elapsed = timestamp - lastParticleTime;

        if (elapsed < 38) {
          return;
        }

        const distance = Math.hypot(
          x - lastParticleX,
          y - lastParticleY,
        );
        const speed = elapsed > 0 ? distance / elapsed : 0;
        if (distance < 5) return;
        const intensity = gsap.utils.clamp(0, 1, speed / 1.8);
        const particle = trailDots[particleIndex];
        particleIndex = (particleIndex + 1) % trailDots.length;
        lastParticleTime = timestamp;
        lastParticleX = x;
        lastParticleY = y;

        gsap.killTweensOf(particle);
        gsap.set(particle, {
          x,
          y,
          opacity: 0.08 + intensity * 0.7,
          scale: 0.7 + intensity * 1.5,
        });
        gsap.to(particle, {
          x: `+=${(Math.random() - 0.5) * 24}`,
          y: `-=${10 + Math.random() * 24}`,
          opacity: 0,
          scale: 0.25 + intensity * 0.25,
          duration: 1.15,
          ease: "power1.out",
          force3D: true,
        });
      };

      const moveCursor = (event) => {
        if (!cursorInitialized) {
          gsap.set(cursor, { x: event.clientX, y: event.clientY, scale: 1 });
          lastParticleX = event.clientX;
          lastParticleY = event.clientY;
          lastParticleTime = event.timeStamp;
          cursorInitialized = true;
        } else {
          moveX(event.clientX);
          moveY(event.clientY);
        }
        emitParticle(event.clientX, event.clientY, event.timeStamp);
        if (!cursorVisible) {
          cursorVisible = true;
          gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: "auto" });
        }
      };
      const hideCursor = () => {
        cursorVisible = false;
        gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.25, overwrite: "auto" });
      };
      const showCursor = () => {
        cursorVisible = true;
        gsap.to(cursor, { opacity: 1, scale: cursorInteractive ? 2.2 : 1, duration: 0.25, overwrite: "auto" });
      };
      const activateCursor = () => {
        gsap.to(cursor, {
          scale: 2.2,
          backgroundColor: "rgba(255, 255, 255, 0.28)",
          borderColor: "rgba(255, 255, 255, 0)",
          duration: 0.3,
          ease: "power3.out",
        });
      };
      const resetCursor = () => {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255, 255, 255, 0.85)",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleInteractiveEnter = (event) => {
        const target = event.target.closest?.(interactiveSelector);
        if (!target || target.contains(event.relatedTarget)) return;
        cursorInteractive = true;
        activateCursor();
      };
      const handleInteractiveLeave = (event) => {
        const target = event.target.closest?.(interactiveSelector);
        if (!target || target.contains(event.relatedTarget)) return;
        cursorInteractive = false;
        resetCursor();
      };

      window.addEventListener("pointermove", moveCursor);
      document.addEventListener("pointerover", handleInteractiveEnter);
      document.addEventListener("pointerout", handleInteractiveLeave);
      document.documentElement.addEventListener("mouseleave", hideCursor);
      document.documentElement.addEventListener("mouseenter", showCursor);
      cleanups.push(() => {
        window.removeEventListener("pointermove", moveCursor);
        document.removeEventListener("pointerover", handleInteractiveEnter);
        document.removeEventListener("pointerout", handleInteractiveLeave);
        document.documentElement.removeEventListener("mouseleave", hideCursor);
        document.documentElement.removeEventListener("mouseenter", showCursor);
      });
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf(
        "[data-gsap-button], [data-gsap-card], .custom-cursor, .cursor-tail, .cursor-tail__dot",
      );
    };
  }, []);

  return (
    <>
      <div className="cursor-tail" ref={trailRef} aria-hidden="true">
        {Array.from({ length: 36 }, (_, index) => (
          <span className="cursor-tail__dot" key={index} />
        ))}
      </div>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
    </>
  );
}

export default GsapEffects;
