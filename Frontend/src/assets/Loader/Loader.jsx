import { useEffect } from "react";
import gsap from "gsap";
import "./Loader.css"; // Import the CSS file

export  function Loader() {
  useEffect(() => {
    gsap.fromTo(
      ".dot",
      { y: 10, opacity: 0.3 },
      { y: -10, opacity: 1, duration: 0.6, stagger: 0.2, repeat: -1, yoyo: true, ease: "power1.inOut" }
    );
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}
