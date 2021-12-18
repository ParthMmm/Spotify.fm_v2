import React from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";
import useBoop from "../../utils/useBoop";
import { useSpring, animated } from "react-spring";
import { store } from "../../app/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { pageSlice } from "../../app/pageSlice";

function HeadingTitle() {
  const router = useRouter();

  const { page } = useSelector((RootState) => RootState.page);
  const { token } = useSelector((RootState) => RootState.code);

  const boopConfig = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1.2,
    timing: 150,
    springConfig: {
      tension: 300,
      friction: 15,
    },
  };

  const titleStyleForm = useSpring({
    config: { mass: 6, tension: 300, friction: 40 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(-300px, 0px)",
      scale: "1",
    },
    height: 0,
    delay: 200,
  });

  const titleStyleLanding = useSpring({
    config: { mass: 6, tension: 300, friction: 40 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(0px, -100px)",
      scale: "3",
    },
    height: 0,
  });

  const [style, setIsBooped] = useBoop(boopConfig);

  if (token || page === "form") {
    return (
      <animated.div style={titleStyleForm}>
        <Flex justifyContent="center">
          <animated.div
            onMouseEnter={() => setIsBooped(true)}
            onMouseLeave={() => setIsBooped(false)}
            style={style}
          >
            <Heading
              bgGradient="linear(to-r, #2feaa8,#028cf3, #C779D0)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-l, #2feaa8,#028cf3, #C779D0)",
              }}
              fontSize={["3rem", "4rem"]}
            >
              <Link
                onClick={() => {
                  router.push("/");
                  store.dispatch(pageSlice.actions.setPage("landing"));
                }}
              >
                spotify.fm
              </Link>
            </Heading>
          </animated.div>
        </Flex>
      </animated.div>
    );
  }
  if (page === "landing" && !token) {
    return (
      <animated.div style={titleStyleLanding}>
        <Flex justifyContent="center">
          <animated.div
            onMouseEnter={() => setIsBooped(true)}
            onMouseLeave={() => setIsBooped(false)}
            style={style}
          >
            <Heading
              bgGradient="linear(to-r, #2feaa8,#028cf3, #C779D0)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-l, #2feaa8,#028cf3, #C779D0)",
              }}
              fontSize={["3rem", "4rem"]}
            >
              <Link
                onClick={() => {
                  router.push("/");
                  store.dispatch(pageSlice.actions.setPage("landing"));
                }}
              >
                spotify.fm
              </Link>
            </Heading>
          </animated.div>
        </Flex>
      </animated.div>
    );
  }
  return <></>;
}

export default HeadingTitle;
