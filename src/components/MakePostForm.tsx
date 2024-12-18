import { useState } from "react";
import PreviewPost from "./PreviewPost";
import PocketBase from 'pocketbase';

export default function MakePostForm({ pb }: { pb: PocketBase }) {
  const [post, setPost] = useState<BillyBlogDraft>({ title: "", body: "", author: "Billy" });
  const [previewPost, setPreviewPost] = useState<boolean>(false);

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

  function handlePreview() {
    if ((post.body != "") || (post.title != "")) {
      setPreviewPost(true);
    }
  }

  return (
    <>
      {previewPost ? <PreviewPost post={post} setPreviewPost={setPreviewPost} pb={pb} /> :
        <form>
          <label htmlFor="title">Title: </label>
          <input name="title" onChange={handleTitle} style={{ width: "50vw" }} value={post.title} />

          <br />

          <label htmlFor="body">Body: </label>
          <textarea name="body" onChange={handleBody} style={{ width: "70vw", height: "45vh" }} value={post.body} />

          <br />

          <label htmlFor="file">File: </label>
          <input type="file" name="file" onChange={handleFile} />

          <br />

          <button onClick={handlePreview} type="button">Preview</button>
        </form>
      }
    </>
  );
}
