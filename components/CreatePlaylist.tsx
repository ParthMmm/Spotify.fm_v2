import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { store, RootState } from "../app/store";
import {
  Text,
  Flex,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Link,
  Button,
} from "@chakra-ui/react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import { useRouter } from "next/router";
interface TopTracks {
  name: string;
  artist: { name: string };
  playcount: number;
}

interface TopTracksData {
  topTracks: TopTracks[];
}

interface TopTracksVars {
  username: string;
  period: string;
}

interface Form {
  username: string;
  period: string;
  playlistName: string;
}

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

  let spot_uri: any = [];
  let failed: any = [];
  let user_id = "";
  let playlist_id = "";
  let playlist_url = "";
  const currDate = new Date().toLocaleString();
  const [success, setSuccess] = useState(false);
  const [spotError, setSpotError] = useState(false);
  const { form } = useSelector((state: RootState) => state.form);
  const { code } = useSelector((state: RootState) => state.code);
  const { token } = useSelector((state: RootState) => state.code);
  var spotify = new SpotifyWebApi();

  const { loading, error, data } = useQuery<TopTracksData, TopTracksVars>(
    TOP_TRACKS,
    {
      variables: { username: form.username, period: form.period },
    }
  );

  const handleSpotify = () => {
    spotify.setAccessToken(token);
    const songs: any = data?.topTracks.map(
      (song) => song.name + " " + song.artist.name
    );
    songs.forEach((song: any) =>
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
        playlist_url = res.external_urls.spotify;
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
    console.log(playlist_url);
  }, [data]);

  if (loading) {
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
            h={{ base: "60%", md: "60%" }}
            w={{ base: "80%", md: "40%" }}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Spinner color="green.400" />
          </Flex>
        </Flex>
      </>
    );
  }

  if (error) {
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
            h={{ base: "60%", md: "60%" }}
            w={{ base: "80%", md: "40%" }}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
            </Alert>
          </Flex>
        </Flex>
      </>
    );
  }
  if (data && !error && !spotError && !success) {
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
            h={{ base: "60%", md: "60%" }}
            w={{ base: "80%", md: "40%" }}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Heading>got your top tracks 🎉</Heading>
            <Text>
              🚧 now creating playlist {form.playlistName} and adding tracks
            </Text>
            <Spinner color="green.400" />
          </Flex>
        </Flex>
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
          direction="column"
          rounded="2xl"
          shadow="2xl"
        >
          <Flex
            direction="column"
            p={{ base: 8, md: 12 }}
            rounded="xl"
            shadow="2xl"
            h={{ base: "60%", md: "60%" }}
            w={{ base: "80%", md: "40%" }}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Heading mb={4}>success! 🎉</Heading>
            <Text mb={2}>
              created playlist {form.playlistName} with period of {form.period}
            </Text>
            <Link href={playlist_url}>{playlist_url}</Link>
            <Button onClick={() => router.push("/")}>go home</Button>
          </Flex>
        </Flex>
      </>
    );
  }
  if (spotError) {
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
            h={{ base: "60%", md: "60%" }}
            w={{ base: "80%", md: "40%" }}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Alert status="error" rounded="2xl">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                spotify error please try again{" "}
                <Button onClick={() => router.push("/")}>go home</Button>
              </AlertDescription>
            </Alert>
          </Flex>
        </Flex>
      </>
    );
  } else {
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
            h={{ base: "60%", md: "60%" }}
            w={{ base: "80%", md: "40%" }}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
          >
            <Alert status="error" rounded="2xl">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <Button onClick={() => router.push("/")}>go home</Button>

              {/* <AlertDescription>{error.error}</AlertDescription> */}
            </Alert>
          </Flex>
        </Flex>
      </>
    );
  }
}

export default CreatePlaylist;
