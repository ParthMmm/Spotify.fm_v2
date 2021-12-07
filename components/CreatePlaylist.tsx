import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { store, RootState } from "../app/store";
import { Text, Flex, Heading, Spinner } from "@chakra-ui/react";

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
  const { form } = useSelector((state: RootState) => state.form);

  console.log(form);
  const { loading, error, data } = useQuery<TopTracksData, TopTracksVars>(
    TOP_TRACKS,
    {
      variables: { username: form.username, period: form.period },
    }
  );

  console.log(loading, error, data);
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      {loading ? <Spinner /> : <> </>}
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

export default CreatePlaylist;
