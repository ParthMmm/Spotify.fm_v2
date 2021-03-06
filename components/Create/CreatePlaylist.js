import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { store } from "../../app/store";
import {
  Text,
  Flex,
  Heading,
  Spinner,
  Link,
  VStack,
  Button,
} from "@chakra-ui/react";
import SpotifyWebApi from "spotify-web-api-js";
import { useRouter } from "next/router";
import { pageSlice } from "../../app/pageSlice";
import Error from "../Error";
import Loader from "../Loader";
import { animated } from "react-spring";
import useBoop from "../../utils/useBoop";

// interface TopTracks {
//   name: string;
//   artist: { name: string };
//   playcount: number;
// }

// interface TopTracksData {
//   topTracks: TopTracks[];
// }

// interface TopTracksVars {
//   username: string;
//   period: string;
// }

// interface Form {
//   username: string;
//   period: string;
//   playlistName: string;
// }

const TOP_TRACKS = gql`
  query topTracks($username: String!, $period: String!) {
    topTracks(username: $username, period: $period) {
      name
      artist {
        name
      }
      playcount
    }
  }
`;

function CreatePlaylist() {
  const router = useRouter();

  let spot_uri = [];
  let failed = [];
  let user_id = "";
  let playlist_id = "";

  const currDate = new Date().toLocaleString();
  const [success, setSuccess] = useState(false);
  const [spotError, setSpotError] = useState(false);
  const [playlistURL, setPlaylistURL] = useState("");
  const { form } = useSelector((RootState) => RootState.form);
  const { token } = useSelector((RootState) => RootState.code);
  var spotify = new SpotifyWebApi();

  const { loading, error, data } = useQuery(TOP_TRACKS, {
    variables: { username: form.username, period: form.period },
  });

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

  const goHome = () => {
    router.push("/");
    store.dispatch(pageSlice.actions.setPage("landing"));
  };

  const handleSpotify = () => {
    spotify.setAccessToken(token);
    const songs = data?.topTracks.map(
      (song) => song.name + " " + song.artist.name
    );
    songs.forEach((song) =>
      spotify
        .searchTracks(song, { limit: 1 })
        .then((res) => {
          if (res?.tracks?.items[0]?.uri) {
            spot_uri.push(res?.tracks?.items[0]?.uri);
          } else {
            failed.push(song);
          }
        })
        .catch(() => setSpotError(true))
    );

    spotify
      .getMe()
      .then((res) => (user_id = res.id))
      .then(() =>
        spotify.createPlaylist(user_id, {
          name: form.playlistName,
          description:
            "Created with Spotify.FM with " +
            `${form.period}` +
            " data from Last.FM. " +
            `${currDate}`,
        })
      )
      .then((res) => {
        setPlaylistURL(res.external_urls.spotify);
        playlist_id = res.id;
      })
      .then(() => {
        spotify.addTracksToPlaylist(playlist_id, spot_uri);
      })
      .then(() => setSuccess(true))
      .catch(() => setSpotError(true));
  };

  useEffect(() => {
    if (data) {
      handleSpotify();
    }
  }, [data]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Error text={"last.fm error please try again"} />
      </>
    );
  }
  if (data && !error && !spotError && !success) {
    return (
      <>
        <>
          <Flex
            height="100vh"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              rounded="2xl"
              shadow="2xl"
              border={["6px", "8px", "8px", "12px"]}
              borderStyle="solid"
              borderColor={"#2feaa8"}
              bg="gray.700"
            >
              <Flex
                rounded="2xl"
                shadow="2xl"
                bg="gray.700"
                flexDir={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={[16, 16, 18, 24]}
                py={[24]}
              >
                <VStack spacing={["64px"]}>
                  <Heading>got your top tracks ????</Heading>
                  <Text textStyle="t2">
                    ???? now creating playlist {form.playlistName} and adding
                    tracks
                  </Text>
                  <Spinner color={"#2feaa8"} />
                </VStack>
              </Flex>
            </Flex>
          </Flex>
        </>
      </>
    );
  }
  if (success) {
    return (
      <>
        <Flex
          height="100vh"
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            rounded="2xl"
            shadow="2xl"
            border={["6px", "8px", "8px", "12px"]}
            borderStyle="solid"
            borderColor={"#2feaa8"}
            bg="gray.700"
          >
            <Flex
              rounded="2xl"
              shadow="2xl"
              bg="gray.700"
              flexDir={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={[16, 16, 18, 24]}
              py={[24]}
            >
              <VStack spacing={["64px"]}>
                <Heading mb={4}>success! ????</Heading>
                <Text mb={2} textStyle="t2" textAlign={"center"}>
                  created playlist{" "}
                  <Link
                    isExternal
                    href={playlistURL}
                    pr={1}
                    color="green.400"
                    textDecoration="underline"
                    textDecorationThickness={"auto"}
                    _hover={{ color: "green.500" }}
                  >
                    {form.playlistName}
                  </Link>
                  with period of
                  <Text as="span" pl={1} color="red.400">
                    {form.period}
                  </Text>
                </Text>
                <animated.div
                  onMouseEnter={() => setIsBooped(true)}
                  onMouseLeave={() => setIsBooped(false)}
                  style={style}
                >
                  <Button
                    onClick={() => goHome()}
                    _hover={{ color: "green.400" }}
                  >
                    go home
                  </Button>
                </animated.div>
              </VStack>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
  if (spotError) {
    return (
      <>
        <Error text={"spotify error please try again"} />
      </>
    );
  } else {
    return (
      <>
        <Error text={"404s and heartbreaks"} />
      </>
    );
  }
}

export default CreatePlaylist;
