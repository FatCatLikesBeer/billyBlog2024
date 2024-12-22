import { useState } from "react";
import Client from "pocketbase";

export default function PostsCommentComponent({
  parentId,
  pb,
  postComments,
  setPostComments,
}: {
  parentId: string;
  pb: Client;
  postComments: BillyBlogPostCommentCollection;
  setPostComments: React.Dispatch<BillyBlogPostCommentCollection>;
}) {
  const [comment, setComment] = useState({ parent: parentId, author: "", body: "" });
  const [showCommentForm, setShowCommentForm] = useState(false);

  const expandComment = () => setShowCommentForm(true);

  function handleAuthor(event: React.ChangeEvent<HTMLInputElement>) {
    let newComment = { ...comment };
    newComment.author = event.target.value;
    setComment({ ...newComment });
  }

  function handleBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let newComment = { ...comment };
    newComment.body = event.target.value;
    setComment({ ...newComment });
  }

  function closeForm() {
    setComment({ parent: parentId, author: "", body: "" });
    setShowCommentForm(false);
  }

  function submitComment() {
    pb.collection('comments').create<BillyBlogPostComment>(comment)
      .then((response) => {
        const newComments = { ...postComments };
        if (!newComments[parentId]) { newComments[parentId] = [] }
        newComments[parentId].reverse().push(response);
        newComments[parentId].reverse();
        setPostComments({ ...newComments });
      })
      .finally(() => {
        setComment({ parent: parentId, author: "", body: "" });
        closeForm();
      });
  }

  return (
    <>
      {
        showCommentForm
          ?
          <div className="home_comment_form">
            <input className="comment_author" type="text" placeholder="Name" onChange={handleAuthor} value={comment.author} />
            <textarea className="home_post_comment_body" placeholder="Comment" onChange={handleBody} value={comment.body} />
            <div className="home_comment_form_button_container">
              <button
                type="button"
                onClick={submitComment}
                disabled={(comment.author.length < 1) || (comment.body.length < 2)}
              >Submit Comment</button>
              <button type="button" onClick={closeForm}>Cancel</button>
            </div>
          </div>
          :
          <button
            type="button"
            onClick={expandComment}
          >Leave Comment</button>
      }
    </>
  );
}
