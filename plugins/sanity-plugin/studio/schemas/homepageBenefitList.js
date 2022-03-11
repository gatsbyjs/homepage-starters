export default {
  name: "homepageBenefitList",
  title: "Homepage Benefit List",
  type: "document",
  fields: [
    { title: "Heading", name: "heading", type: "string" },
    { title: "Text", name: "text", type: "string" },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "homepageBenefit" }],
        },
      ],
    },
  ],
}
