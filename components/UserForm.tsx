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
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { store } from "../app/store";
import { formSlice } from "../app/formSlice";
import { useRouter } from "next/router";

function UserForm() {
  const [value, setValue] = React.useState("1");
  const router = useRouter();
  // const validate = (values) => {
  //   const errors = {};

  //   if (!values.rating) {
  //     errors.rating = "required";
  //   }
  //   if (!values.title) {
  //     errors.title = "required";
  //   }
  //   if (!values.reviewBody) {
  //     errors.reviewBody = "required";
  //   }

  //   return errors;
  // };

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
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        h="100vh"
      >
        <Heading>My Form</Heading>
        <Formik
          // validate={validate}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values);
            store.dispatch(formSlice.actions.setForm(values));
            router.push("/create");
            actions.resetForm({});
          }}
        >
          <Form>
            <Field name="username" type="number">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <Text> set last.fm username </Text>

                  <Input
                    {...field}
                    id="username"
                    placeholder="enter username"
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
                  mt={3}
                >
                  <Text> set playlist name </Text>

                  <Input
                    {...field}
                    id="playlistName"
                    placeholder="enter playlist name"
                  />
                  <FormErrorMessage>
                    {form.errors.playlistName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="period">
              {({ field, form: { setFieldValue, errors, touched } }) => (
                <FormControl isInvalid={errors.period && touched.period} mt={4}>
                  <Text> set period </Text>
                  <RadioGroup
                    {...field}
                    id="period"
                    onChange={(value) => {
                      setValue(value);
                      setFieldValue("period", value);
                    }}
                    value={value}
                  >
                    <Stack direction="column">
                      <Radio value="7day">7 days</Radio>
                      <Radio value="1month">1 month</Radio>
                      <Radio value="3month">3 months</Radio>
                      <Radio value="6month">6 months</Radio>
                      <Radio value="12month">12 months</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{errors.period}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Box d="flex" justifyContent="space-between" my={4}>
              {" "}
              <Button
                // isLoading={action.loading}
                type="submit"
                bg="tomato"
                rounded="xl"
                size="md"
                _hover={{ background: "purple.600" }}
              >
                <Text
                  _hover={{ color: "tomato" }}
                  fontSize="1rem"
                  color="white"
                >
                  submit
                </Text>
              </Button>
            </Box>
          </Form>
        </Formik>
      </Flex>
    </>
  );
}

export default UserForm;
