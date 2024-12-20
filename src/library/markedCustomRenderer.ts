import { marked } from "marked";

const customRenderer = new marked.Renderer();

customRenderer.link = function({ href, title, text }) {
  const targetAttribute = 'target="_blank"';
  const relAttribute = 'rel="noopener noreferrer"';
  const titleAttribute = title ? `title=${title}` : '';
  return `<a href=${href} ${titleAttribute} ${relAttribute} ${targetAttribute}>${text}</a>`
}

export default customRenderer;
