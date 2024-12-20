export default function embiggenImage(element: HTMLImageElement) {
  if (element.className == "post_attachment") {
    element.className = "post_attachment_expand";
  } else {
    element.className = "post_attachment"
  }
}
