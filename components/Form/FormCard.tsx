import React from "react";
import { Flex, VStack } from "@chakra-ui/react";

import UserForm from "./UserForm";
import HeadingTitle from "../Landing/HeadingTitle";

function FormCard() {
  return (
    <Flex
      rounded="2xl"
      shadow="2xl"
      border={["6px", "8px", "8px", "12px"]}
      borderStyle="solid"
      borderColor={"#2feaa8"}
      bg="gray.700"
    >
      <Flex
        rounded="2xl"
        shadow="2xl"
        bg="gray.700"
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={[16, 16, 18, 24]}
        py={[24]}
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
