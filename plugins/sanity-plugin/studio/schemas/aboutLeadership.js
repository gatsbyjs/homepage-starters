export default {
  name: "aboutLeadership",
  title: "About Leadership",
  type: "document",
  fields: [
    { title: "Heading", name: "heading", type: "string" },
    { title: "Kicker", name: "kicker", type: "string" },
    { title: "Subhead", name: "subhead", type: "string" },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "aboutProfile" }],
        },
      ],
    },
  ],
}
