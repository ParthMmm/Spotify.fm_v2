import React from "react";
import {
  Button,
  Flex,
  Text,
  FormLabel,
  FormErrorMessage,
  FormControl,
  Input,
  useColorMode,
  Textarea,
  Heading,
  Box,
  Radio,
  RadioGroup,
  Stack,
  Link,
  Select,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { store } from "../app/store";
import { formSlice } from "../app/formSlice";
import { useRouter } from "next/router";

function UserForm() {
  const [value, setValue] = React.useState("1");
  const router = useRouter();

  const validate = (values: any) => {
    const errors: FormValues = {
      username: "",
      playlistName: "",
      period: "",
    };

    if (!values.username) {
      errors.username = "required";
    }
    if (!values.playlistName) {
      errors.playlistName = "required";
    }
    if (!values.period) {
      errors.period = "required";
    }

    return errors;
  };

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

  return (
    <>
      <Flex
        height="100vh"
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        rounded="2xl"
        shadow="2xl"
      >
        <Flex
          direction="column"
          p={{ base: 8, md: 12 }}
          rounded="xl"
          shadow="2xl"
          h={{ base: "60%", md: "50%" }}
          w={{ base: "80%", md: "30%" }}
          justifyContent="space-evenly"
          bg="gray.700"

          // bg={colorMode === "light" ? "#ECF0F1" : "#34495E"}
        >
          <Flex alignItems="center" justifyContent="flex-start" mb={10}>
            <Heading
              // fontSize={{ base: "24px", md: "36px", lg: "48px" }}

              bgGradient="linear(to-r, #2feaa8,#028cf3, #C779D0)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-l, #2feaa8,#028cf3, #C779D0)",
              }}
              // _hover={{
              //   color: "purple.200",
              // }}
              fontSize="3rem"
            >
              spotify.fm
            </Heading>
          </Flex>
          <Formik
            // validate={validate}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log(values);
              store.dispatch(formSlice.actions.setForm({ form: values }));
              router.push("/create");
              actions.resetForm({});
            }}
          >
            <Form>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    {/* <Text> set last.fm username </Text> */}

                    <Input
                      {...field}
                      id="username"
                      placeholder="enter last.fm username"
                      variant="flushed"
                      mb={6}
                    />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="playlistName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.playlistName && form.touched.playlistName
                    }
                  >
                    {/* <Text> set playlist name </Text> */}

                    <Input
                      {...field}
                      id="playlistName"
                      placeholder="enter playlist name"
                      variant="flushed"
                      mb={8}
                    />
                    <FormErrorMessage>
                      {form.errors.playlistName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="period">
                {({ field, form: { setFieldValue, errors, touched } }) => (
                  <FormControl isInvalid={errors.period && touched.period}>
                    <Box
                      d="flex"
                      alignItems="baseline"
                      justifyContent="space-between"
                      flexFlow="row wrap"
                      w="100%"
                      mb={8}
                    >
                      <Text
                        // as="span"
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
                        variant="unstyled"
                        color="green.400"
                        size="2xl"
                        fontWeight="500"
                        onChange={(e) =>
                          setFieldValue("period", e.target.value)
                        }
                        placeholder="time period"
                      >
                        <option value="7day">7 days</option>
                        <option value="1month">1 month</option>
                        <option value="3month">3 months</option>
                        <option value="6month">6 months</option>
                        <option value="12month">12 months</option>
                      </Select>
                    </Box>

                    <FormErrorMessage>{errors.period}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Box float="right" mt={5}>
                {" "}
                <Button
                  // isLoading={action.loading}
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
            </Form>
          </Formik>
        </Flex>
      </Flex>
    </>
  );
}

export default UserForm;
