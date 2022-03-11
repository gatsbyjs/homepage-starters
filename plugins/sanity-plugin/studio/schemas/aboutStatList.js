export default {
  name: "aboutStatList",
  title: "About Stat List",
  type: "document",
  fields: [
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "aboutStat" }],
        },
      ],
    },
  ],
}
