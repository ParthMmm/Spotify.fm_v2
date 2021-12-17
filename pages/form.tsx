import { useState } from "react";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { codeSlice } from "../app/codeSlice";
import { store, RootState } from "../app/store";
import UserForm from "../components/Form/UserForm";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
import { pageSlice } from "../app/pageSlice";
import FormCard from "../components/Form/FormCard";
import Card from "../components/Form/Card";
import Loader from "../components/Loader";
const Form: NextPage = () => {
  const router = useRouter();
  let error = "";
  let code: string | undefined = String(router.query.code);
  if (code) {
    store.dispatch(codeSlice.actions.setCode(code));
  }
  const doNothing = () => {};

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
  };
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  };

  useEffect(() => {
    setLoading(true);

    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      )
      .then((res) => {
        console.log(res);
        store.dispatch(pageSlice.actions.setPage("form"));
        store.dispatch(codeSlice.actions.setToken(res.data.access_token));
        if (res.data.access_token) {
          setSuccess(true);
          setLoading(false);
        }
        // store.dispatch(pageSlice.actions.setPage("form"));
      })
      .catch((err) => doNothing()); //do nothing spotify api is weird
  }, [code]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (success) {
    return (
      <>
        <Card />
      </>
    );
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
};

export default Form;
