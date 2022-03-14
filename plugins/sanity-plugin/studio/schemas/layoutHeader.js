export default {
  name: "layoutHeader",
  title: "Layout Header",
  type: "document",
  fields: [
    {
      title: "Nav Items",
      name: "navItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "navItem" }, { type: "navItemGroup" }],
        },
      ],
    },
    {
      title: "CTA",
      name: "cta",
      type: "reference",
      to: [{ type: "homepageLink" }],
    },
  ],
}
