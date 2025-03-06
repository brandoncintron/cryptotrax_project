import { Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";

const StarIcon = () => {
  return (
    <motion.div
      style={{ perspective: 1000 }} // Adding perspective for a proper 3D effect
      animate={{
        rotateY: [0, 360],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
    >
      <Icon boxSize={10} mb={4}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 512 512"
          viewBox="0 0 512 512"
          id="star"
        >
          <polygon
            fill="#ffd759"
            points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4"
          ></polygon>
          <polygon fill="#fabd3b" points="256 256 6 200.5 137 320.1"></polygon>
          <polygon
            fill="#fabd3b"
            points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"
          ></polygon>
          <polygon
            fill="#fabd3b"
            points="256 256 506 198.6 375.9 319.2"
          ></polygon>
          <polygon
            fill="#fabd3b"
            points="255.3 17.9 256 256 329.7 178.9"
          ></polygon>
        </svg>
      </Icon>
    </motion.div>
  );
};

export default StarIcon;
