import React from "react";
import { Text, Flex, Heading, Box } from "@chakra-ui/react";

import { useTransition, useSpring, animated, useTrail, a } from "react-spring";
import { useSelector } from "react-redux";
import CreatePlaylist from "../CreatePlaylist";
import FormCard from "./FormCard";

function Card() {
  const styles = useSpring({
    config: { mass: 8, tension: 1000, friction: 500, duration: 250 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1.0" },
    from: {
      opacity: 0,
      transform: "translate(0px, 0px)",
      scale: "1.0",
    },
    height: 0,
  });
  return (
    <>
      <Flex
        height="100vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
        // direction="column"
      >
        <animated.div style={styles}>
          <FormCard />
        </animated.div>
      </Flex>
    </>
  );
}

export default Card;
