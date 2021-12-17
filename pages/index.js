import Head from "next/head";
import { store, RootState } from "../app/store";
import { configureStore, PayloadAction, createStore } from "@reduxjs/toolkit";

import MainCard from "../components/Landing/MainCard";
function Home() {
  return (
    <>
      <Head>
        <title>spotify.fm</title>
        <meta name="description" content="spotify.fm playlists by parthm.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainCard />
      <footer></footer>
    </>
  );
}

export default Home;
