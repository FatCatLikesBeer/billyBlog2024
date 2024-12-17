import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header id='header'>
      <h1 id="hero_title">Billy's Blog</h1>
      <nav id="navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/social">Social</Link>
        <Link to="/apps">Apps</Link>
        <Link to="/archive">Archive</Link>
        <a href="https://github.com/FatCatLikesBeer" target="_blank"><img src="/github-mark-white.png" className="link_logo" /></a>
        <a href="https://billlaaayyy.bsky.social" target="_blank"><img src="/bluesky_logo_light.png" className="link_logo" /></a>
      </nav>
    </header>
  );
}
