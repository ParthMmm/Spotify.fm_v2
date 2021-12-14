import React from "react";
import { Text, Flex, Heading, Box, VStack } from "@chakra-ui/react";

import { useTransition, useSpring, animated, useTrail, a } from "react-spring";
import { useSelector } from "react-redux";
import UserForm from "./UserForm";
import HeadingTitle from "../Landing/HeadingTitle";

function FormCard() {
  return (
    <Flex
      rounded="2xl"
      border="8px solid"
      borderColor={"#2feaa8"}
      p={[12, 12, 24]}
      // h="100%"
      // w="100%"
    >
      <Flex
        rounded="xl"
        shadow="2xl"
        // h={{ base: "80%", md: "100%" }}
        // w={{ base: "80%", md: "100%" }}
        bg="gray.700"
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={[12, 12, 24]}
      >
        <VStack spacing={["128px"]}>
          <HeadingTitle />
          <UserForm />
        </VStack>
      </Flex>
    </Flex>
  );
}

export default FormCard;
