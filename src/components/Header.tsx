import { Link } from "react-router-dom";

/**
 * Blog header - contains blog name, navigation, and social
 */
export default function Header() {
  return (
    <header id='header'>
      <div>
        <h1 id="hero_title">Billy's Blog</h1>
      </div>
      <nav id="navigation">
        <div id="navigation_links">
          <Link to="/posts">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/social">Social</Link>
          <Link to="/apps">Apps</Link>
          <Link to="/archives">Archive</Link>
        </div>
        <div id="navigation_contact">
          <a href="https://github.com/FatCatLikesBeer" target="_blank"><img src="/github-mark-white.png" className="link_logo" /></a>
          <a href="https://billlaaayyy.bsky.social" target="_blank"><img src="/bluesky_logo_light.png" className="link_logo" /></a>
          <a href="mailto:itisbilly@icloud.com" target="_blank"><img src="/email.png" className="link_logo" /></a>
        </div>
      </nav>
    </header>
  );
}
