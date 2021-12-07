import { Text, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import SpotifyLogin from "./SpotifyLogin";

function Landing() {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        h="100vh"
        flexDir="column"
      >
        <Heading color="green.400">spotify.fm</Heading>
        <SpotifyLogin />
      </Flex>
    </>
  );
}

export default Landing;
