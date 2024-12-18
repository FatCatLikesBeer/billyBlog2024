import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { marked } from 'marked';
import formatTimeStamp from '../library/formatTimeStamp';
import { useNavigate } from 'react-router-dom';

export default function PreviewPost(
  { post, setPreviewPost, pb }: { post: BillyBlogDraft; setPreviewPost: React.Dispatch<React.SetStateAction<boolean>>; pb: PocketBase }
) {
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();

  function handleClose() {
    setPreviewPost(false);
  }

  function handleSubmit() {
    pb.collection('posts').create<BillyBlogDraft>(post)
      .then((_) => { navigate('/') })
      .catch((err: Error) => {
        setErrMessage(err.message);
      });
  }

  const parsedBody = String(marked.parse(post.body));

  let fileURL = post.attachment ? URL.createObjectURL(post.attachment) : undefined;

  return (
    <>
      <button onClick={handleClose} type="button">Close</button>
      {errMessage.length > 2 ? <p style={{ color: "red" }}>{errMessage}</p> : ""}
      <div>
        <h3 className="post_title">{post.title}</h3>
        <p className="post_time_stamp">{formatTimeStamp(Date())}</p>
        <p className="post_body" dangerouslySetInnerHTML={{ __html: parsedBody }}></p>
        {fileURL ? <img src={fileURL} /> : ""}
      </div>
      <button onClick={handleSubmit} type="button">Submit</button>
    </>
  );
}
