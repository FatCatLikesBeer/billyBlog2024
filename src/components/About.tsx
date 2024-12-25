/**
 * About component
 * @returns div containing info about me
 */
export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Self-taught web developer specializing in TypeScript. Fascinated by the power of browser Web APIs. Reluctantly believes that people's primary web experience happens on mobile.<sup><a href="#index1" className="super_script">1</a></sup></p>
      <p>Current occupation: Facility and automation specialist for indoor cannabis operations in Los Angeles.</p>
      <p>B.A. in Philosophy: California State University Northridge 2014</p>
      <p>Familiarities: React,<sup><a href="#index2" className="super_script">2</a></sup> PocketBase,<sup><a href="#index2" className="super_script">2</a></sup> JavaScript, TypeScript,<sup><a href="#index2" className="super_script">2</a></sup> Expo, Neovim, Linux (Fedora), macOS, ExpressJS, SQL, Vite, cURL, zsh, fish, MongoDB,<sup><a href="#index3" className="super_script">3</a></sup> flyctl, Python, WebAudio API.</p>

      <div id="index_container">
        <p id="index1" className="index_text">1) <a target="_blank" href="https://noise-maker.fly.dev">Check out my noise maker on mobile.</a></p>
        <p id="index2" className="index_text">2) Used to build this blog.</p>
        <p id="index3" className="index_text">3) Technology I've previously used but have since abandoned</p>
      </div>
    </div>
  )
}
