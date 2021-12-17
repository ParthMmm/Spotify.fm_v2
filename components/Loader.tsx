import React from "react";
import { Text, Flex, Heading, Box, VStack, Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <>
      <Flex
        height="100vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
        // direction="column"
      >
        <Flex
          rounded="2xl"
          // shadow="2xl"
          // border="12px solid"
          // borderColor={"#2feaa8"}
          // p={[8, 8, 24]}
          // h="100%"
          // w="100%"
          // bg="gray.700"
        >
          <Flex
            rounded="xl"
            // shadow="2xl"
            // h={{ base: "80%", md: "100%" }}
            // w={{ base: "80%", md: "100%" }}
            // bg="gray.700"
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={[12, 12, 24]}
          >
            <VStack spacing={["128px"]}>
              <Spinner color="#2feaa8" />
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Loader;
