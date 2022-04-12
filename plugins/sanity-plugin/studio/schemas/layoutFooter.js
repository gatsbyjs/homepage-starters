export default {
  name: "layoutFooter",
  title: "Layout Footer",
  type: "document",
  fields: [
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
    {
      title: "Meta",
      name: "meta",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "homepageLink" }],
        },
      ],
    },
    {
      title: "Social Links",
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "socialLink" }],
        },
      ],
    },
    { title: "Copyright", name: "copyright", type: "string" },
  ],
}
