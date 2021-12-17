import React from "react";
import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import SpotifyLogin from "../SpotifyLogin";
import Landing from "./Landing";
import { useTransition, useSpring, animated, useTrail, a } from "react-spring";
import { useSelector } from "react-redux";
import { store, RootState } from "../../app/store";
import UserForm from "../Form/UserForm";
import CreatePlaylist from "../Create/CreatePlaylist";

function MainCard() {
  const { page } = useSelector((state: RootState) => state.page);

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
        // borderColor={"#2feaa8"}
        // direction="column"
      >
        <animated.div style={styles}>
          <Landing />
        </animated.div>
      </Flex>
    </>
  );
}

export default MainCard;
