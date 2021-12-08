import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { codeSlice } from "../app/codeSlice";
import { store, RootState } from "../app/store";
import UserForm from "../components/UserForm";
import { useSelector } from "react-redux";
import CreatePlaylist from "../components/CreatePlaylist";

const Create: NextPage = () => {
  return (
    <>
      <CreatePlaylist />
    </>
  );
};

export default Create;