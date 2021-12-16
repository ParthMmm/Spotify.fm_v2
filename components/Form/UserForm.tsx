import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  FormErrorMessage,
  FormControl,
  Input,
  Heading,
  Box,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import useBoop from "../../utils/useBoop";

import { store } from "../../app/store";
import { formSlice } from "../../app/formSlice";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import HeadingTitle from "../Landing/HeadingTitle";
import { useTransition, useSpring, animated, useTrail, a } from "react-spring";
import { pageSlice } from "../../app/pageSlice";

interface FormValues {
  username: string;
  playlistName: string;
  period: string;
}
const initialValues: FormValues = {
  username: "",
  playlistName: "",
  period: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("required"),
  playlistName: Yup.string().required("required"),
  period: Yup.string().required("required"),
});

function UserForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = ({
    username,
    playlistName,
    period,
  }) => {
    store.dispatch(
      formSlice.actions.setForm({ form: { username, playlistName, period } })
    );
    store.dispatch(pageSlice.actions.setPage("create"));

    router.push("/create");
    reset();
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

  const buttonStyle = useSpring({
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

  const optionsStyle = useSpring({
    config: { mass: 2, tension: 275, friction: 20 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(0px,-100px)",
      scale: "1",
    },
    height: 0,
    delay: 1300,
  });

  const inputsStyle = useSpring({
    config: { mass: 2, tension: 275, friction: 20 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(-100px,0px)",
      scale: "1",
    },
    height: 0,
    delay: 600,
  });

  const [show, set] = useState(true);

  const transitions = useTransition(0, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 1900,
    expires: 2,
    onRest: () => set(!show),
    // expires: 2000,
  });

  return (
    <>
      <Flex flexDir="column" alignItems={"center"}>
        <FormControl isInvalid={Boolean(errors?.username)} mb={6} mx={36}>
          <animated.div style={inputsStyle}>
            <Input
              type="username"
              id="username"
              placeholder="enter last.fm username"
              variant="flushed"
              {...register("username")}
            />
          </animated.div>

          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.playlistName)} mb={8}>
          <animated.div style={inputsStyle}>
            <Input
              type="name"
              id="playlistName"
              placeholder="enter playlist name"
              variant="flushed"
              {...register("playlistName")}
            />
          </animated.div>

          <FormErrorMessage>{errors.playlistName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.period)} mb={8}>
          <animated.div style={inputsStyle}>
            <Box
              d="flex"
              alignItems="baseline"
              justifyContent="space-between"
              flexFlow="row wrap"
              w="100%"
            >
              <Text
                as="span"
                // w="25%"
                fontWeight="500"
                text-align="left"
              >
                from the last
              </Text>

              <Select
                w="75%"
                // bg="tomato"
                // borderColor="tomato"
                {...register("period")}
                variant="unstyled"
                color="green.400"
                size="2xl"
                fontWeight="500"
                // onChange={(e) => setFieldValue("period", e.target.value)}
                placeholder="time period"
              >
                <option value="7day">7 days</option>
                <option value="1month">1 month</option>
                <option value="3month">3 months</option>
                <option value="6month">6 months</option>
                <option value="12month">12 months</option>
              </Select>

              {/* {transitions(({ opacity }) => (
                <animated.div
                  style={{
                    opacity: opacity.to({ range: [0.0, 1.0], output: [1, 0] }),
                  }}
                >
                  <Trail>
                    <Text color="green.400" size="2xl" fontWeight="500">
                      7 days
                    </Text>
                    <Text color="green.400" size="2xl" fontWeight="500">
                      1 month
                    </Text>
                    <Text color="green.400" size="2xl" fontWeight="500">
                      3 months
                    </Text>
                    <Text color="green.400" size="2xl" fontWeight="500">
                      6 months
                    </Text>
                    <Text color="green.400" size="2xl" fontWeight="500">
                      12 months
                    </Text>
                  </Trail>
                </animated.div>
              ))} */}
            </Box>
          </animated.div>

          <FormErrorMessage>{errors.period?.message}</FormErrorMessage>
        </FormControl>
        <animated.div style={buttonStyle}>
          <Box float="right" mt={10}>
            {" "}
            <animated.div
              onMouseEnter={() => setIsBooped(true)}
              onMouseLeave={() => setIsBooped(false)}
              style={style}
            >
              <Button
                // isLoading={action.loading}

                onClick={handleSubmit(onSubmit)}
                type="submit"
                bg="green.400"
                rounded="xl"
                size="md"
                _hover={{ background: "green.600" }}
              >
                <Text fontSize="1rem" color="white">
                  submit
                </Text>
              </Button>
            </animated.div>
          </Box>
        </animated.div>
      </Flex>
    </>
  );
}

const Trail = ({ children }) => {
  const items = React.Children.toArray(children);
  console.log(items.length);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 60, friction: 10 },
    to: { opacity: 1, transform: "translate(125px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(125px,-400px)",
      scale: "1",
    },
    leave: {
      opacity: 0,
    },
    height: 0,
    delay: 0,
  });
  return (
    <Stack direction="column" spacing="8px" mb={4} z-Index={2}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </Stack>
  );
};

export default UserForm;
