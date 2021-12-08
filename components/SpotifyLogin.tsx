import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { redirectUrlToSpotifyForLogin } from "../utils/spotifyFunctions";
import { store } from "../app/store";
function SpotifyLogin() {
  // console.log(redirectUrlToSpotifyForLogin());
  return (
    <div>
      <Button>
        <Link href={redirectUrlToSpotifyForLogin()}>Spotify Login</Link>
      </Button>
    </div>
  );
}

export default SpotifyLogin;
