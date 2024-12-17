import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";

import PocketBaseAtom from "../state/PocketBaseAtom";

export default function Home() {
  const [posts, setPosts] = useState<BillyBlogPost[]>(placeHolderContent);
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    pb.collection('posts').getList<BillyBlogPost>()
      .then((response) => {
        const items = response.items;
        setPosts([...items]);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => {
        let parsedBody = String(marked.parse(post.body));
        parsedBody = parsedBody.substring(3, parsedBody.length - 5);
        return (
          <div key={post.id + 'div'}>
            <h3 key={post.id + 'title'} className="post_title">{post.title}</h3>
            <p key={post.id + 'timestamp'} className="post_time_stamp">{formatTimeStamp(post.created)}</p>
            <p key={post.id + 'body'} className="post_body" dangerouslySetInnerHTML={{ __html: parsedBody }}></p>
          </div>
        );
      })}
    </div>
  );
}

const placeHolderContent: BillyBlogPost[] = [{
  id: "1",
  title: "This is palceholder text",
  created: "1969-12-1",
  body: "Text will go here",
}];

function formatTimeStamp(timeStamp: string) {
  const date = new Date(timeStamp);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
