import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import React from "react";
import SpotifyLogin from "./SpotifyLogin";

function Landing() {
  return (
    <>
      <Box w="100%">
        <Flex justifyContent="flex-start" mb={10}>
          {" "}
          <Heading
            bgGradient="linear(to-r, #2feaa8,#028cf3, #C779D0)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-l, #2feaa8,#028cf3, #C779D0)",
            }}
            fontSize="3rem"
          >
            spotify.fm
          </Heading>
        </Flex>

        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
          mt={48}
        >
          <Text textAlign="center" fontSize="xl" fontWeight={"600"} mb={5}>
            create spotify playlists from your last.fm scrobbles
          </Text>
          <SpotifyLogin />
          <Text mt={2} fontSize={"1rem"} fontWeight={"400"} color={"gray.600"}>
            spotify and last.fm account required
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default Landing;
