import React from "react";
import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import SpotifyLogin from "./SpotifyLogin";
import Landing from "./Landing";

function MainCard() {
  return (
    <>
      <Flex
        height="100vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        rounded="2xl"
        shadow="2xl"
      >
        <Flex
          p={{ base: 8, md: 12 }}
          rounded="xl"
          shadow="2xl"
          h={{ base: "60%", md: "60%" }}
          w={{ base: "80%", md: "40%" }}
          bg="gray.700"
        >
          <Landing />
        </Flex>
      </Flex>
    </>
  );
}

export default MainCard;
