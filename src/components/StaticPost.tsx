import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";
import { useParams } from "react-router-dom";
import { placeHolderPost } from "../state/staticData";
import embiggenImage from "../library/embiggenImage";
import customRenderer from "../library/markedCustomRenderer";
import formatTimeStamp from "../library/formatTimeStamp";
import PocketBaseAtom from "../state/PocketBaseAtom";

const URL = "https://billy-blog.pockethost.io/api/files/";

marked.setOptions({ renderer: customRenderer, });

export default function StaticPost() {
  const [errTimer, setErrTiemr] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [post, setPost] = useState<BillyBlogPost>(placeHolderPost[0] as BillyBlogPost);
  const params = useParams();
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    if (params.postId) {
      pb.collection('posts').getOne<BillyBlogPost>(params.postId)
        .then((response) => { setPost((response)) })
        .catch((error) => { setErrMessage(error.message) })
        .finally(() => {
          setTimeout(() => {
            setErrTiemr(true);
          }, 5000);
        });
    }
  }, []);

  let parsedBody = String(marked.parse(post.body));
  parsedBody = parsedBody.substring(3, parsedBody.length - 5);

  return (
    <>
      <p className="error_message">{errMessage.length > 2 && post.id.length < 2 && errTimer ? errMessage.toString() : ""}</p>
      <div key={post.id + 'div'} className="post">
        <h3 key={post.id + 'title'} className="post_title">{post.title}</h3>
        <p key={post.id + 'timestamp'} className="post_time_stamp">{formatTimeStamp(post.created)}</p>
        <p key={post.id + 'body'} className="post_body" dangerouslySetInnerHTML={{ __html: parsedBody }}></p>
        {post.attachment
          ?
          <img
            className="post_attachment"
            key={post.id + 'attachment'}
            src={`${URL}${post.collectionId}/${post.id}/${post.attachment}`}
            onClick={(e) => embiggenImage(e.currentTarget)}
          />
          :
          ""}
      </div>
    </>
  );
}
