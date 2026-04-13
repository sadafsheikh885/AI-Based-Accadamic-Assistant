import { motion } from "framer-motion";
import "./start.css";

import leftImg from "../asset/left.png";   // apni image path set karo
import rightVideo from "../asset/right.webm";

export default function StartPage({ goToLogin }) {
  return (
    <div className="start-wrap">
      <div className="bubble b1"></div>
      <div className="bubble b2"></div>
      <div className="bubble b3"></div>
      <div className="start-card">

        {/* LEFT IMAGE */}
        <div className="side">
          <img src={leftImg} alt="left" className="illus" />
        </div>

        {/* CENTER CONTENT */}
        <div className="center">
          <h1 className="title">Academix</h1>

          <motion.button
            className="btn"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 35px rgba(90, 16, 216, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={goToLogin}
          >
            EXPLORE
          </motion.button>
        </div>

        {/* RIGHT VIDEO */}
<div className="side">
  <video
    className="video"
    src={rightVideo}
    autoPlay
    loop
    muted
    playsInline
  />
</div>
      </div>
    </div>
  );
}