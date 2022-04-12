export default {
  name: "layout",
  title: "Layout",
  type: "document",
  fields: [
    {
      title: "Header",
      name: "header",
      type: "reference",
      to: [{ type: "layoutHeader" }],
    },
    {
      title: "Footer",
      name: "footer",
      type: "reference",
      to: [{ type: "layoutFooter" }],
    },
  ],
}
