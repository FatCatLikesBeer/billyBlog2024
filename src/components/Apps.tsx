export default function Apps() {
  return (
    <table>
      <tr>
        <th>App & Link</th>
        <th>Description</th>
        <th>Source Code</th>
      </tr>
      <tr>
        <td><a href="https://billy-blog.pockethost.io" target="_blank">billy-blog</a></td>
        <td>This is my blog! You're already here! 😆</td>
        <td>N/A</td>
      </tr>
      <tr>
        <td><a href="https://noise-maker.fly.dev/" target="_blank">Sound Lab</a></td>
        <td>Exploring the WebAudio API. Best on mobile 📲. Warning <strong>LOUD! 🔊</strong>.</td>
        <td><a href="https://github.com/FatCatLikesBeer/audio" target="_blank">GitHub</a></td>
      </tr>
      <tr>
        <td><a href="https://bluebubbles.fly.dev/" target="_blank">Blue Bubbles</a></td>
        <td>Blue bubbles for everyone 🔵💬🔵! A messaging app. Didn't use React because I wanted to explore DOM manipulation and web sockets.</td>
        <td><a href="https://github.com/FatCatLikesBeer/chat-app-back-end" target="_blank">GitHub</a></td>
      </tr>
      <tr>
        <td><a href="https://bored-programmer-api.fly.dev/" target="_blank">Bored Programmer</a></td>
        <td>Like boredapi.com (RIP) but for programmers! 💻</td>
        <td><a href="https://github.com/FatCatLikesBeer/bored_programmer" target="_blank">GitHub</a></td>
      </tr>
    </table>
  );
}