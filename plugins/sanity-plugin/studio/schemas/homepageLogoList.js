export default {
  name: "homepageLogoList",
  title: "Homepage Logo List",
  type: "document",
  fields: [
    { title: "Text", name: "text", type: "string" },
    {
      title: "Logos",
      name: "logos",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "homepageLogo" }],
        },
      ],
    },
  ],
}
