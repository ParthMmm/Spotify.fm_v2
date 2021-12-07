import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { codeSlice } from "../app/codeSlice";
import { store, RootState } from "../app/store";
import UserForm from "../components/UserForm";
import { useSelector } from "react-redux";

const Form: NextPage = () => {
  const router = useRouter();

  // console.log(typeof router.query.code);
  if (router.query.code) {
    store.dispatch(codeSlice.actions.setCode(router.query.code));
  }

  const code = useSelector((state: RootState) => state.code);
  console.log(code);
  return (
    <>
      <UserForm />
    </>
  );
};

export default Form;
