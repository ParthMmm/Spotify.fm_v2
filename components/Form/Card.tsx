import React from "react";
import { Flex } from "@chakra-ui/react";

import { useSpring, animated } from "react-spring";
import FormCard from "./FormCard";

function Card() {
  const styles = useSpring({
    config: { mass: 8, tension: 300, friction: 40 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1.0" },
    from: {
      opacity: 0,
      transform: "translate(0px, 0px)",
      scale: "1",
    },
    height: 0,
  });
  return (
    <>
      <Flex height="100vh" w="100%" alignItems="center" justifyContent="center">
        <animated.div style={styles}>
          <FormCard />
        </animated.div>
      </Flex>
    </>
  );
}

export default Card;
