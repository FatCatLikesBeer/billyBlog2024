import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Social from './components/Social';
import Archive from './components/Archive';
import Apps from './components/Apps.tsx';
import MakePost from './components/MakePost.tsx';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/social" element={<Social />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/make_post" element={<MakePost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
