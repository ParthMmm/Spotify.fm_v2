import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { codeSlice } from "../app/codeSlice";
import { store, RootState } from "../app/store";
import UserForm from "../components/UserForm";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
const Form: NextPage = () => {
  const router = useRouter();

  // console.log(typeof router.query.code);
  let code: string | undefined = String(router.query.code);
  if (code) {
    store.dispatch(codeSlice.actions.setCode(code));
  }

  // let authOptions = {
  //   method: "post",
  //   url: "https://accounts.spotify.com/api/token",
  //   form: {
  //     code: code,
  //     redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  //     grant_type: "authorization_code",
  //   },
  //   headers: {
  //     Authorization:
  //       "Basic " +
  //       new Buffer(
  //         process.env.NEXT_PUBLIC_CLIENT_ID +
  //           ":" +
  //           process.env.NEXT_PUBLIC_CLIENT_SECRET
  //       ).toString("base64"),
  //   },
  //   json: true,
  // };

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.NEXT_PUBLIC_CLIENT_ID +
            ":" +
            process.env.NEXT_PUBLIC_CLIENT_SECRET
        ).toString("base64"),
    },

    // auth: {
    //   username: process.env.NEXT_PUBLIC_CLIENT_ID,
    //   password: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    // },
  };
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  };

  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      )
      .then((res) =>
        store.dispatch(codeSlice.actions.setToken(res.data.access_token))
      )
      .catch((error) => console.log(""));
  }, [code]);
  // if (code) {
  //   axios
  //     .post(
  //       "https://accounts.spotify.com/api/token",
  //       qs.stringify(data),
  //       headers
  //     )
  //     .then((res) =>
  //       store.dispatch(codeSlice.actions.setToken(res.data.access_token))
  //     );
  // }
  // console.log(code);
  return (
    <>
      <UserForm />
    </>
  );
};

export default Form;
