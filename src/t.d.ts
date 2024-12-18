interface BillyBlogPost {
  id: string;
  body: string;
  attachment?: string;
  title: string;
  created: string;
  collectionId?: string;
}

interface BillyBlogDraft {
  author: string;
  title: string;
  body: string;
  attachment?: Blob;
}
