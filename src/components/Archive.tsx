import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";
import formatTimeStamp from "../library/formatTimeStamp";
import embiggenImage from "../library/embiggenImage";
import customRenderer from "../library/markedCustomRenderer";

import PocketBaseAtom from "../state/PocketBaseAtom";

const URL = "https://billy-blog.pockethost.io/api/files/";

marked.setOptions({ renderer: customRenderer });

/**
 * Archive Component - Posts from old blog
 * @prop archive - collection of archived posts
 * @prop setArchive - React.Dispatch function for setting archive
 * @returns a div containing archived posts
 */
export default function Home({
  archive,
  setArchive,
}: {
  archive: BillyBlogArchive[];
  setArchive: React.Dispatch<BillyBlogArchive[]>;
}) {
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    if (archive.length <= 1) {
      pb.collection('archive').getList<BillyBlogArchive>(1, 20, { sort: "-created" })
        .then((response) => {
          const items = response.items;
          setArchive([...items]);
        });
    }
  }, []);

  return (
    <div>
      {archive.map((post) => {
        let parsedBody = post.body;
        parsedBody = parsedBody.replaceAll("\\r", "");
        parsedBody = parsedBody.replaceAll("\\n", "\n");
        parsedBody = parsedBody.replaceAll("\\", "");
        parsedBody = String(marked.parse(parsedBody));
        return (
          <div key={post.id + 'div'} className="post">
            <h3 key={post.id + 'title'} className="post_title"><a href={`/archives/${post.id}`}>{post.title}</a></h3>
            <p key={post.id + 'timestamp'} className="post_time_stamp">{formatTimeStamp(post.timeStamp)}</p>
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
