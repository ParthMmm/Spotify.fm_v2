import { Text, Flex, Stack } from "@chakra-ui/react";
import React from "react";

import { useTrail, a } from "react-spring";

function MainContent() {
  return (
    <>
      <Flex alignItems={"center"} direction={["column", "column", "row"]}>
        <Stack
          direction="row"
          d="flex"
          alignItems={"center"}
          spacing={["4px", "4px", "6px"]}
          mb={2}
          mr={2}
        >
          <Trail>
            <Text as="span" textStyle="t2" pr={["1", "0", "0"]}>
              create
            </Text>
            <Text
              as="span"
              textStyle="t2"
              _hover={{ color: "green.500" }}
              color={"green.400"}
              pr={["1", "0", "0"]}
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
            <Text as="span" textStyle="t2" pr={["1", "0", "0"]}>
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
              pr={["1", "0", "0"]}
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
    >
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </Stack>
  );
};

export default MainContent;
