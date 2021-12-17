import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { store, RootState } from "../app/store";
import {
  Text,
  Flex,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Link,
  VStack,
  Button,
} from "@chakra-ui/react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import { useRouter } from "next/router";
import { pageSlice } from "../app/pageSlice";
import useBoop from "../utils/useBoop";
import { useTransition, useSpring, animated, useTrail, a } from "react-spring";

function Error({ text }) {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
    store.dispatch(pageSlice.actions.setPage("landing"));
  };
  const boopConfig = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1.1,
    timing: 150,
    springConfig: {
      mass: 1,
      tension: 250,
      friction: 10,
    },
  };
  const [style, setIsBooped] = useBoop(boopConfig);

  return (
    <>
      <Flex height="100vh" w="100%" alignItems="center" justifyContent="center">
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
            <VStack spacing={["64px"]}>
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                rounded="2xl"
              >
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription p="5" fontWeight="600">
                  {text}
                </AlertDescription>
                <animated.div
                  onMouseEnter={() => setIsBooped(true)}
                  onMouseLeave={() => setIsBooped(false)}
                  style={style}
                >
                  <Button
                    onClick={() => goHome()}
                    _hover={{ color: "green.400" }}
                  >
                    go home
                  </Button>
                </animated.div>
              </Alert>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Error;
