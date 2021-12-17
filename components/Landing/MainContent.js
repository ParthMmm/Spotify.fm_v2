import { Text, Flex, Heading, Stack, Spacer } from "@chakra-ui/react";
import React from "react";
import HeadingTitle from "./HeadingTitle";
import SpotifyLogin from "../SpotifyLogin";
import { useTransition, useSpring, animated, useTrail, a } from "react-spring";

function MainContent() {
  return (
    <>
      <Flex
        //   justifyContent={"center"}
        alignItems={"center"}
        direction={["column", "column", "row"]}
      >
        <Stack
          direction="row"
          d="flex"
          alignItems={"center"}
          spacing={["2px", "4px", "6px"]}
          mb={2}
          mr={2}
        >
          <Trail>
            <Text as="span" textStyle="t2">
              create
            </Text>
            <Text
              as="span"
              textStyle="t2"
              _hover={{ color: "green.500" }}
              color={"green.400"}
            >
              spotify
            </Text>
            <Text as="span" textStyle="t2">
              playlists
            </Text>
          </Trail>
        </Stack>
        <Stack
          direction="row"
          d="flex"
          alignItems={"center"}
          spacing={["2px", "4px", "6px"]}
          mb={2}
          mr={2}
        >
          <Trail>
            <Text as="span" textStyle="t2">
              from
            </Text>
            <Text as="span" textStyle="t2">
              your
            </Text>
          </Trail>
        </Stack>
        <Stack
          direction={["row", "row", "column"]}
          d="flex"
          alignItems={"center"}
          spacing={["2px", "4px", "6px"]}
          mb={2}
          mr={2}
        >
          <Trail>
            <Text
              as="span"
              textStyle="t2"
              _hover={{ color: "red.500" }}
              color={"red.400"}
            >
              last.fm
            </Text>
            <Text as="span" textStyle="t2">
              scrobbles
            </Text>
          </Trail>
        </Stack>
      </Flex>
    </>
  );
}

const Trail = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 60, friction: 10 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(0px,-300px)",
      scale: "1",
    },
    height: 0,
    delay: 350,
  });
  return (
    <Stack
      direction="row"
      d="flex"
      alignItems={"center"}
      spacing={["2px", "4px", "8px"]}
      //   mb={4}
    >
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </Stack>
  );
};

const Trail2 = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 60, friction: 10 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(0px,0px)",
      scale: "0.1",
    },
    height: 0,
    delay: 1200,
  });
  return (
    <Stack direction="row" spacing="8px" mb={4}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </Stack>
  );
};

export default MainContent;
