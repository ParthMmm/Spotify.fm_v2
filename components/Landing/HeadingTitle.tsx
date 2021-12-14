import React from "react";
import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import useBoop from "../../utils/useBoop";
import { useTransition, useSpring, animated, useTrail, a } from "react-spring";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

function HeadingTitle() {
  const boopConfig = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1.2,
    timing: 150,
    springConfig: {
      tension: 300,
      friction: 15,
    },
  };

  let styles = useSpring({
    config: { mass: 6, tension: 300, friction: 40 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(0px, -100px)",
      scale: "3",
    },
    height: 0,
  });

  const { page } = useSelector((state: RootState) => state.page);

  if (page === "form") {
    let styles = useSpring({
      config: { mass: 6, tension: 300, friction: 40 },
      to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
      from: {
        opacity: 0,
        transform: "translate(0px, -100px)",
        scale: "1",
      },
      height: 0,
    });
  } else {
    let styles = useSpring({
      config: { mass: 6, tension: 300, friction: 40 },
      to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
      from: {
        opacity: 0,
        transform: "translate(0px, -100px)",
        scale: "3",
      },
      height: 0,
    });
  }

  const [style, setIsBooped] = useBoop(boopConfig);

  return (
    <animated.div style={styles}>
      <Flex justifyContent="center">
        {" "}
        <animated.div
          onMouseEnter={() => setIsBooped(true)}
          onMouseLeave={() => setIsBooped(false)}
          style={style}
        >
          <Heading
            bgGradient="linear(to-r, #2feaa8,#028cf3, #C779D0)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-l, #2feaa8,#028cf3, #C779D0)",
            }}
            fontSize="4rem"
          >
            spotify.fm
          </Heading>
        </animated.div>
      </Flex>
    </animated.div>
  );
}

export default HeadingTitle;
