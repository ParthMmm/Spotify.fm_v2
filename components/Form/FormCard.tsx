import React from "react";
import { Flex, VStack } from "@chakra-ui/react";

import UserForm from "./UserForm";
import HeadingTitle from "../Landing/HeadingTitle";

function FormCard() {
  return (
    <Flex
      rounded="2xl"
      shadow="2xl"
      border="12px solid"
      borderColor={"#2feaa8"}
      bg="gray.700"
    >
      <Flex
        rounded="xl"
        shadow="2xl"
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
