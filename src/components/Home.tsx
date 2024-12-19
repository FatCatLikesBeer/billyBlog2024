import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";
import formatTimeStamp from "../library/formatTimeStamp";

import PocketBaseAtom from "../state/PocketBaseAtom";

const URL = "https://billy-blog.pockethost.io/api/files/";

const customRenderer = new marked.Renderer();

customRenderer.link = function({ href, title, text }) {
  const targetAttribute = 'target="_blank"';
  const relAttribute = 'rel="noopener noreferrer"';
  const titleAttribute = title ? `title=${title}` : '';
  return `<a href=${href} ${titleAttribute} ${relAttribute} ${targetAttribute}>${text}</a>`
}

marked.setOptions({
  renderer: customRenderer,
})

export default function Home() {
  const [posts, setPosts] = useState<BillyBlogPost[]>(placeHolderContent);
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    pb.collection('posts').getList<BillyBlogPost>(1, 20, { sort: "-created" })
      .then((response) => {
        const items = response.items;
        setPosts([...items]);
      });
  }, []);

  function embiggenImage(element: HTMLImageElement) {
    if (element.className == "post_attachment") {
      element.className = "post_attachment_expand";
    } else {
      element.className = "post_attachment"
    }
  }

  return (
    <div>
      {posts.map((post) => {
        let parsedBody = String(marked.parse(post.body));
        parsedBody = parsedBody.substring(3, parsedBody.length - 5);
        return (
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
        );
      })}
    </div>
  );
}

const placeHolderContent: BillyBlogPost[] = [{
  id: "1",
  title: "",
  created: "none",
  body: "",
}];
