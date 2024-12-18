import { useState } from "react";
import { useAtomValue } from "jotai";
import MakePostAuth from "./MakePostAuth";
import MakePostForm from "./MakePostForm";

import PocketBaseAtom from "../state/PocketBaseAtom";

export default function MakePost() {
  const pb = useAtomValue(PocketBaseAtom);
  const [loggedIn, setLoggedIn] = useState<boolean>(pb.authStore.isValid);

  function handleLogout() {
    pb.authStore.clear();
    setLoggedIn(pb.authStore.isValid);
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        {loggedIn ? <MakePostForm pb={pb} /> : <MakePostAuth setLoggedIn={setLoggedIn} />}
        {loggedIn &&
          <button style={{ position: "absolute", top: 0, right: 0 }} onClick={handleLogout}>Log Out</button>
        }
      </div>
    </>
  );
}
