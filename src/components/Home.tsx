import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";
import formatTimeStamp from "../library/formatTimeStamp";
import embiggenImage from "../library/embiggenImage";
import customRenderer from "../library/markedCustomRenderer";

import PocketBaseAtom from "../state/PocketBaseAtom";

const URL = "https://billy-blog.pockethost.io/api/files/";

marked.setOptions({
  renderer: customRenderer,
});

export default function Home({ posts, setPosts }: { posts: BillyBlogPost[]; setPosts: React.Dispatch<BillyBlogPost[]> }) {
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    if (posts.length <= 1) {
      pb.collection('posts').getList<BillyBlogPost>(1, 20, { sort: "-created" })
        .then((response) => {
          const items = response.items;
          setPosts([...items]);
        });
    }
  }, []);

  return (
    <div>
      {posts.map((post) => {
        let parsedBody = String(marked.parse(post.body));
        parsedBody = parsedBody.substring(3, parsedBody.length - 5);
        return (
          <div key={post.id + 'div'} className="post">
            <h3 key={post.id + 'title'} className="post_title"><a href={`/posts/${post.id}`}>{post.title}</a></h3>
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
        );
      })}
    </div>
  );
}


