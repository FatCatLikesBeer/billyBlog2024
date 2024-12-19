import { useState } from "react";
import { useAtomValue } from "jotai";
import MakePostAuth from "./MakePostAuth";
import MakePostForm from "./MakePostForm";
import { useNavigate } from 'react-router-dom';

import PocketBaseAtom from "../state/PocketBaseAtom";

export default function MakePost() {
  const pb = useAtomValue(PocketBaseAtom);
  const [loggedIn, setLoggedIn] = useState<boolean>(pb.authStore.isValid);
  const navigate = useNavigate();

  function handleLogout() {
    pb.authStore.clear();
    setLoggedIn(pb.authStore.isValid);
    navigate('/');
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
