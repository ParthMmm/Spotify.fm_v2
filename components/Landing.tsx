import { Text, Flex, Heading, Box } from "@chakra-ui/react";
import React from "react";
import SpotifyLogin from "./SpotifyLogin";

function Landing() {
  return (
    <>
      <Box direction="column">
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

        <Flex justifyContent={"center"} flexFlow={"column nowrap"} mt={48}>
          {" "}
          <Flex>
            {" "}
            <Text textAlign="center" fontSize="xl" fontWeight={"600"} mb={5}>
              create spotify playlists from your last.fm scrobbles
            </Text>
          </Flex>
          <Flex
            justifyContent={"flex-end"}
            alignItems="center"
            flexDir={"column"}
          >
            {" "}
            <SpotifyLogin />
            <Text
              mt={2}
              fontSize={"1rem"}
              fontWeight={"400"}
              color={"gray.600"}
            >
              spotify and last.fm account required
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Landing;
