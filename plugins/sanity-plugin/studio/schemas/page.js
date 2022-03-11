export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    { title: "Title", name: "title", type: "string" },
    { title: "Description", name: "description", type: "string" },
    { title: "Image", name: "image", type: "image" },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
}
