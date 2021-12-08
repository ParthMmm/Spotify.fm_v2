import React from "react";
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
} from "@chakra-ui/react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

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
  let spot_uri = [];
  let user_id = "";
  let playlist_id = "";
  const currDate = new Date().toLocaleString();

  const { form } = useSelector((state: RootState) => state.form);
  const { code } = useSelector((state: RootState) => state.code);
  const { token } = useSelector((state: RootState) => state.code);
  console.log(token);
  var spotify = new SpotifyWebApi();

  const { loading, error, data } = useQuery<TopTracksData, TopTracksVars>(
    TOP_TRACKS,
    {
      variables: { username: form.username, period: form.period },
    }
  );

  console.log(loading, error, data);

  if (loading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        h="100vh"
        flexDir="column"
      >
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <>
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100vh"
          flexDir="column"
        >
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            {/* <AlertDescription>{error.error}</AlertDescription> */}
          </Alert>
        </Flex>
      </>
    );
  }
  if (data) {
    const songs = data.topTracks.map(
      (song) => song.name + " " + song.artist.name
    );
    spotify.setAccessToken(token);
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // axios
    //   .get("https://api.spotify.com/v1/me", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => console.log(res));
    // axios
    //   .get("https://api.spotify.com/v1/me", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => console.log(res));

    spotify.getMe().then((res) => console.log(res));
    // songs.forEach((s) =>
    //   spotify.searchTracks(s, { limit: 1 }, function (err, data) {
    //     if (err) console.error(err);
    //     else {
    //       try {
    //         spot_uri.push(data.tracks.items[0].uri);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   })
    // );

    // spotify
    //   .getMe()
    //   .then(function (data) {
    //     user_id = data.id;
    //   })
    //   .then(function () {
    //     spotify
    //       .createPlaylist(user_id, {
    //         name: form.playlistName,
    //         description:
    //           "Created with Spotify.FM with " +
    //           `${form.period}` +
    //           " data from Last.FM. " +
    //           `${currDate}`,
    //       })
    //       .then(
    //         function (data) {
    //           playlist_id = data.id;
    //         },
    //         function (err) {
    //           console.error(err);
    //         }
    //       )
    //       .then(function () {
    //         spotify.addTracksToPlaylist(playlist_id, spot_uri).then(
    //           function (data) {},
    //           function (err) {
    //             console.error(err);
    //           }
    //         );
    //       });
    //   });
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        h="100vh"
        flexDir="column"
      >
        {data ? (
          data.topTracks.map((track) => {
            return <Text key={track.name}>{track.name}</Text>;
          })
        ) : (
          <></>
        )}
      </Flex>
    );
  }
}

export default CreatePlaylist;
