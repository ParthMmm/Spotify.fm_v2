import { Box, Button, Link, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { redirectUrlToSpotifyForLogin } from "../utils/spotifyFunctions";
import { FaSpotify } from "react-icons/fa";
import useBoop from "../utils/useBoop";
import { useSpring, animated, a } from "react-spring";

function SpotifyLogin() {
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
  const style2 = useSpring({
    config: { mass: 2, tension: 275, friction: 20 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(0px,0px)",
      scale: "0.1",
    },
    height: 0,
    delay: 1300,
  });

  const [style, setIsBooped] = useBoop(boopConfig);
  return (
    <animated.div style={style2}>
      <Box>
        <animated.div
          onMouseEnter={() => setIsBooped(true)}
          onMouseLeave={() => setIsBooped(false)}
          style={style}
        >
          <Link
            href={redirectUrlToSpotifyForLogin()}
            _hover={{ color: "green.400" }}
          >
            <Button size="lg">
              <Icon as={FaSpotify} />
              <Text as="span" ml={2}>
                login with spotify
              </Text>
            </Button>
          </Link>
        </animated.div>
      </Box>
    </animated.div>
  );
}

export default SpotifyLogin;
