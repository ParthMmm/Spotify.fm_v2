import { Text, Flex, Heading, Stack, Spacer } from "@chakra-ui/react";
import React from "react";

import { useTransition, useSpring, animated, useTrail, a } from "react-spring";

function SubText() {
  const Trail2 = ({ children }) => {
    const items = React.Children.toArray(children);
    console.log(items.length);
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
  return (
    <Flex>
      <Trail2>
        <Text mt={1} fontSize={"sm"} fontWeight={"500"} color={"gray.600"}>
          spotify and last.fm account required
        </Text>
      </Trail2>{" "}
    </Flex>
  );
}

export default SubText;
