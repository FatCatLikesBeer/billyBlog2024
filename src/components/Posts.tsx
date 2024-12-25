import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";
import formatTimeStamp from "../library/formatTimeStamp";
import embiggenImage from "../library/embiggenImage";
import customRenderer from "../library/markedCustomRenderer";
import PostsCommentComponent from "./PostsCommentComponent";

import PocketBaseAtom from "../state/PocketBaseAtom";

const URL = "https://billy-blog.pockethost.io/api/files/";

marked.setOptions({ renderer: customRenderer });

/**
 * Home/Posts Component
 * @prop posts - collection of blog posts to display
 * @prop setPosts - setter fucntion for posts
 * @prop postComments - collection of post comments to display
 * @prop setPostComments - setter function for comments
 * @returns a div containing posts
 */
export default function Posts({
  posts,
  setPosts,
  postComments,
  setPostComments
}: {
  posts: BillyBlogPost[];
  setPosts: React.Dispatch<BillyBlogPost[]>;
  postComments: BillyBlogPostCommentCollection;
  setPostComments: React.Dispatch<BillyBlogPostCommentCollection>;
}) {
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

  useEffect(() => {
    if (posts.length <= 1) {
      pb.collection('comments').getFullList<BillyBlogPostComment>({ sort: "-created" })
        .then((response) => {
          const commentsObjCollection: BillyBlogPostCommentCollection = {};
          response.forEach((element: BillyBlogPostComment) => {
            if (!commentsObjCollection[element.parent]) {
              commentsObjCollection[element.parent] = [];
            }
            commentsObjCollection[element.parent]!.push(element);
          });
          setPostComments({ ...commentsObjCollection });
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
            <p key={post.id + 'body'} className="post_body" dangerouslySetInnerHTML={{ __html: parsedBody }} ></p>
            {post.attachment
              ?
              <div className="image_container">
                <img
                  className="post_attachment"
                  key={post.id + 'attachment'}
                  src={`${URL}${post.collectionId}/${post.id}/${post.attachment}`}
                  onClick={(e) => embiggenImage(e.currentTarget)}
                />
              </div>
              :
              ""}
            <div className="post_comment_container" key={post.id + "comment_container"}>
              <div className="post_comment_block">
                {postComments[post?.id]?.map((element) => {
                  return (
                    <div key={element.id + "comment"}>
                      <p className="post_comment_author" key={element.id + "author"}>{element.author} — {formatTimeStamp(element.created)}</p>
                      <p className="post_comment_body" key={element.id + "body"}>{element.body}</p>
                    </div>
                  )
                })}
              </div>
              {post.id.length > 2 ? <PostsCommentComponent
                parentId={post.id}
                pb={pb}
                postComments={postComments}
                setPostComments={setPostComments}
              /> : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}


