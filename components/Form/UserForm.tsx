import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

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
  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Trail>
        <Flex flexDir="column" alignItems={"center"}>
          <FormControl isInvalid={Boolean(errors?.username)} mb={6} mx={36}>
            <Input
              type="username"
              id="username"
              placeholder="enter last.fm username"
              variant="flushed"
              {...register("username")}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors?.playlistName)} mb={8}>
            <Input
              type="name"
              id="playlistName"
              placeholder="enter playlist name"
              variant="flushed"
              {...register("playlistName")}
            />
            <FormErrorMessage>{errors.playlistName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors?.period)} mb={8}>
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
            </Box>

            <FormErrorMessage>{errors.period?.message}</FormErrorMessage>
          </FormControl>
          <Box float="right" mt={5}>
            {" "}
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
          </Box>
        </Flex>
      </Trail>
    </>
  );
}

const Trail = ({ children }) => {
  const items = React.Children.toArray(children);
  console.log(items.length);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 60, friction: 10 },
    to: { opacity: 1, transform: "translate(0px, 0px)", scale: "1" },
    from: {
      opacity: 0,
      transform: "translate(-100px,0px)",
      scale: "1",
    },
    height: 0,
    delay: 350,
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

export default UserForm;
