import React, { useState } from "react";
import { useAtomValue } from "jotai";

import PocketBaseAtom from "../state/PocketBaseAtom";

export default function MakePost() {
  const [auth, setAuth] = useState({ userName: "", password: "" });
  const [post, setPost] = useState<BillyBlogDraft>({ title: "", body: "", author: "Billy" });
  const pb = useAtomValue(PocketBaseAtom);

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    let thisAuth = auth;
    thisAuth.password = event.target.value;
    setAuth({ ...thisAuth });
  }

  function handleUserName(event: React.ChangeEvent<HTMLInputElement>) {
    let thisAuth = auth;
    thisAuth.userName = event.target.value;
    setAuth({ ...thisAuth });
  }

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    let thisPost = post;
    thisPost.title = event.target.value;
    setPost({ ...thisPost });
  }

  function handleBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let thisPost = post;
    thisPost.body = event.target.value;
    setPost({ ...thisPost });
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const thisPost = post;
      thisPost.attachment = event.target.files[0];
      setPost({ ...thisPost });
    }
  }

  function handleSubmit() {
    pb.admins.authWithPassword(auth.userName, auth.password)
      .then((result) => { console.log(result) });
    console.log(post);
    pb.collection('posts').create<BillyBlogDraft>(post);
  }

  return (
    <div>
      <form>
        <label htmlFor="title">Title: </label>
        <input name="title" onChange={handleTitle} />

        <label htmlFor="body">Body: </label>
        <textarea name="body" onChange={handleBody} style={{ width: "70vw", height: "45vh" }} />

        <label htmlFor="file">File</label>
        <input type="file" name="file" onChange={handleFile} />

        <label htmlFor="auth">Auth: </label>
        <input name="auth" value={auth.userName} onChange={handleUserName} />

        <label htmlFor="key">Key: </label>
        <input name="key" value={auth.password} onChange={handlePassword} type="password" />

        <br />

        <button onClick={handleSubmit} type="button">Submit</button>
      </form>
    </div>
  );
}
