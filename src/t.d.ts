/**
 * Blog Post
 */
interface BillyBlogPost {
  /** Id of post: string */
  id: string;
  /** Post body: string */
  body: string;
  /** Post attachment: URL */
  attachment?: URL;
  /** Post title: string */
  title: string;
  /** Post date created: string */
  created: string;
  /** ID of the Posts collection: string */
  collectionId?: string;
}

/**
 * Post on previous blog
 */
interface BillyBlogArchive extends BillyBlogPost {
  /** Date created of Archived Post */
  timeStamp: string;
}

/**
 * Draft type for a future post
 */
interface BillyBlogDraft {
  /** Literally Billy */
  author: string;
  /** title: string */
  title: string;
  /** body: string */
  body: string;
  /** image attachment: Blob */
  attachment?: Blob;
}

/**
 * Individual Comment for a post
 */
interface BillyBlogPostComment {
  /** Comment ID: string */
  id: string;
  /** Date of comment creation: string */
  created: string;
  /** Comment body: string */
  body: string;
  /** Comment author: string */
  author: string;
  /** Id of comment's post: string */
  parent: string;
}

/**
 * Collection (object) of Post Comments
 * Keyed by Post ID
 */
interface BillyBlogPostCommentCollection {
  /** Array of BillyBlogPostComments */
  [key: string]: BillyBlogPostComment[];
}
