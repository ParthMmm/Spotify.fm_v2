import { Text, Flex, Heading, Box, VStack } from "@chakra-ui/react";
import React from "react";
import HeadingTitle from "./HeadingTitle";
import SpotifyLogin from "../SpotifyLogin";
import MainContent from "./MainContent";

function Landing() {
  return (
    <Flex
      rounded="2xl"
      shadow="2xl"
      border="12px solid"
      borderColor={"#2feaa8"}
      // p={[8, 8, 24]}
      // h="100%"
      // w="100%"
      bg="gray.700"
    >
      <Flex
        rounded="2xl"
        shadow="2xl"
        // border="10px solid"
        // borderColor={"#2feaa8"}
        // h={{ base: "80%", md: "100%" }}
        // w={{ base: "80%", md: "100%" }}
        bg="gray.700"
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={[8, 8, 24]}
      >
        <VStack spacing={["128px", "128px"]}>
          <HeadingTitle />
          <SpotifyLogin />
          <MainContent />
        </VStack>
      </Flex>
    </Flex>
  );
}

export default Landing;
