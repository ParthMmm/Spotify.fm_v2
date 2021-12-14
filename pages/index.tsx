import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Landing from "../components/Landing/Landing";
import MainCard from "../components/Landing/MainCard";
const Home: NextPage = () => {
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
};

export default Home;
