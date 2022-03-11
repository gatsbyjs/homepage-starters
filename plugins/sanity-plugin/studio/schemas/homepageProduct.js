export default {
  name: "homepageProduct",
  title: "Homepage Product",
  type: "document",
  fields: [
    { title: "Heading", name: "heading", type: "string" },
    { title: "Image", name: "image", type: "image" },
    { title: "Text", name: "text", type: "string" },
    {
      title: "Links",
      name: "links",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "homepageLink" }],
        },
      ],
    },
  ],
}
