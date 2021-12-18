import React from "react";
import { Flex } from "@chakra-ui/react";
import Landing from "./Landing";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function MainCard() {
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
      <Flex height="100vh" w="100%" alignItems="center" justifyContent="center">
        <animated.div style={styles}>
          <Landing />
        </animated.div>
      </Flex>
    </>
  );
}

export default MainCard;
