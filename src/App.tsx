import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Posts from './components/Posts';
import About from './components/About';
import Social from './components/Social';
import Archive from './components/Archive';
import Apps from './components/Apps.tsx';
import MakePost from './components/MakePost.tsx';
import StaticPost from './components/StaticPost.tsx';
import StaticArchive from './components/StaticArchive.tsx';
import { Route, Routes, Navigate } from 'react-router-dom';

import { placeHolderPost, placeHolderArchive } from './state/staticData.ts';

function App() {
  const [posts, setPosts] = useState<BillyBlogPost[]>(placeHolderPost);
  const [postComments, setPostComments] = useState<BillyBlogPostCommentCollection>({});
  const [archive, setArchive] = useState<BillyBlogArchive[]>(placeHolderArchive);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Posts
              posts={posts}
              setPosts={setPosts}
              postComments={postComments}
              setPostComments={setPostComments}
            />
          }
        />
        <Route
          path="/archives"
          element={
            <Archive
              archive={archive}
              setArchive={setArchive}
            />
          }
        />
        <Route path="/posts" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/social" element={<Social />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/make_post" element={<MakePost />} />
        <Route path="/posts/:postId" element={<StaticPost />} />
        <Route path="/archives/:archiveId" element={<StaticArchive />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// TODO: change textarea font style
