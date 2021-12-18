import React from "react";
import { Flex, VStack, Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <>
      <Flex height="100vh" w="100%" alignItems="center" justifyContent="center">
        <Flex rounded="2xl">
          <Flex
            rounded="xl"
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
