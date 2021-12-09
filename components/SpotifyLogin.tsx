import { Button, Link, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { redirectUrlToSpotifyForLogin } from "../utils/spotifyFunctions";
import { store } from "../app/store";
import { FaSpotify } from "react-icons/fa";
function SpotifyLogin() {
  // console.log(redirectUrlToSpotifyForLogin());
  return (
    <>
      <Link
        href={redirectUrlToSpotifyForLogin()}
        _hover={{ color: "green.400" }}
      >
        <Button>
          <Icon as={FaSpotify} />
          <Text as="span" ml={2}>
            login with spotify
          </Text>
        </Button>
      </Link>
    </>
  );
}

export default SpotifyLogin;
