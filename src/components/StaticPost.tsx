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

marked.setOptions({ renderer: customRenderer });

/**
 * Details view for an individual post
 * @returns a view for an individual post comments section
 */
export default function StaticPost() {
  const params = useParams();
  const [errTimer, setErrTiemr] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [post, setPost] = useState<BillyBlogPost>(placeHolderPost[0] as BillyBlogPost);
  const [comments, setComments] = useState<BillyBlogPostComment[]>([]);
  const [createComment, setCreateComment] = useState({ author: "", body: "", parent: params.postId });
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    if (params.postId) {
      pb.collection('posts').getOne<BillyBlogPost>(params.postId)
        .then((response) => { setPost((response)) })
        .catch((error) => { setErrMessage(error.message + " 😩") })
        .finally(() => {
          setTimeout(() => {
            setErrTiemr(true);
          }, 5000);
        });
      pb.collection('comments').getFullList<BillyBlogPostComment>({ filter: `parent.id = '${params.postId}'`, sort: "-created" })
        .then((response) => { setComments(response) });
    }
  }, []);

  let parsedBody = String(marked.parse(post.body));
  parsedBody = parsedBody.substring(3, parsedBody.length - 5);

  function setCommenterAuthor(event: React.ChangeEvent<HTMLInputElement>) {
    const commentObject = { ...createComment };
    commentObject.author = event.target.value;
    setCreateComment({ ...commentObject });
  }

  function setCommenterBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const commentObject = { ...createComment };
    commentObject.body = event.target.value;
    setCreateComment({ ...commentObject });
  }

  function handleSubmit() {
    pb.collection('comments').create<BillyBlogPostComment>(createComment)
      .then((response) => {
        const workingComments = [...comments].reverse();
        workingComments.push(response);
        setComments(workingComments.reverse());
      });
    setCreateComment({ author: "", body: "", parent: params.postId });
  }

  function deleteComment(element: BillyBlogPostComment) {
    if (window.confirm(`---DELETE COMMENT---\n\n${element.author} - ${formatTimeStamp(element.created)}\n${element.body}`)) {
      pb.collection('comments').delete(element.id)
        .then(() => { window.alert("Comment Deleted!") })
        .finally(() => { window.location.reload(); });
    } else {
      console.log("Comment not deleted");
    }
  }

  return (
    <>
      {errMessage.length > 2 && post.id.length < 2 && errTimer ? <p className="error_message">errMessage.toString()</p> : ""}
      <div key={post.id + 'div'} className="post">
        <h3 key={post.id + 'title'} className="post_title">{post.title}</h3>
        <p key={post.id + 'timestamp'} className="post_time_stamp">{formatTimeStamp(post.created)}</p>
        <p key={post.id + 'body'} className="post_body" dangerouslySetInnerHTML={{ __html: parsedBody }}></p>
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
        {/* Comments */}
        <div className="post_comment_container" key={post.id + "comment_container"}>
          <div className="post_comment_block">
            {comments?.map((element) => {
              return (
                <div key={element.id + "comment"}>
                  <p className="post_comment_author" key={element.id + "author"}>{element.author} — {formatTimeStamp(element.created)}</p>
                  <p
                    className="post_comment_body"
                    key={element.id + "body"}
                    onClick={
                      pb.authStore.isAdmin
                        ?
                        () => { deleteComment(element) }
                        :
                        () => { }
                    }
                  >{element.body}</p>
                </div>
              )
            })}
          </div>
          {/* Comment Form */}
          {post.id.length < 2
            ?
            ""
            :
            <form className="comment_form">
              <input
                type="text"
                name="Name"
                placeholder="Name"
                className="comment_name"
                value={createComment.author}
                onChange={setCommenterAuthor}
              />
              <textarea
                name="Body"
                placeholder="Comment here"
                className="comment_body"
                value={createComment.body}
                onChange={setCommenterBody}
              />
              <button
                className="comment_submit"
                onClick={handleSubmit}
                type="button"
                disabled={(createComment.author.length < 1) || (createComment.body.length < 2) ? true : false}
              >Comment</button>
            </form>
          }
        </div>
      </div>
    </>
  );
}

// TODO: Add comments to posts details page (here)
