import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import React from "react";
import SpotifyLogin from "./SpotifyLogin";

function Landing() {
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
          direction="column"
          p={{ base: 8, md: 12 }}
          rounded="xl"
          shadow="2xl"
          h={{ base: "60%", md: "60%" }}
          w={{ base: "80%", md: "40%" }}
          alignItems="center"
          justifyContent="center"
          bg="gray.700"
        >
          <Heading color="green.400" mb={20}>
            spotify.fm playlists
          </Heading>
          <Text textAlign="center" fontSize={"1rem"} fontWeight={"400"} mb={5}>
            generate spotify playlists from your last.fm scrobbles
          </Text>
          <SpotifyLogin />

          <Text
            textAlign="center"
            fontSize={"1rem"}
            fontWeight={"400"}
            mb={5}
            color={"gray.600"}
          >
            spotify and last.fm account required
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Landing;
