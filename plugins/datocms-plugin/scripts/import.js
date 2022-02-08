// https://www.datocms.com/docs/import-and-export/importing-data#step-3-importing-to-datocms
const fs = require("fs")
const { SiteClient } = require("datocms-client")
const data = require("./data.json")

// fields that link to other fields must be created
// after the linked field
// The API does not sort itemTypes based on dependencies
// so this list ensures itemTypes and fields are created
// in the correct order
const orderedItemTypes = [
  "Link",
  "Social Link",
  "Benefit",
  "Feature",
  "Product",
  "Stat",
  "Testimonial",
  "Hero",
  "CTA",
  "BenefitList",
  "FeatureList",
  "LogoList",
  "ProductList",
  "StatList",
  "TestimonialList",
  "Homepage",
  "LayoutHeader",
  "LayoutFooter",
  "Layout",
  "Page",
]

async function importContent(token) {
  console.log(`Importing ${data.itemTypes.length} DatoCMS Models`)
  const client = new SiteClient(token)
  const { itemTypes, fields } = data

  const errors = []

  // map field validators to itemType names
  fields.forEach((field) => {
    const richItemTypes = field.validators.richTextBlocks?.itemTypes
    const linkItemTypes = field.validators.itemItemType?.itemTypes
    if (!richItemTypes?.length && !linkItemTypes?.length) return
    if (richItemTypes) {
      field.validators.richTextBlocks.itemTypes = richItemTypes.map((id) => {
        return itemTypes.find((t) => t.id === id)?.apiKey
      })
    }
    if (linkItemTypes) {
      field.validators.itemItemType.itemTypes = linkItemTypes.map((id) => {
        return itemTypes.find((t) => t.id === id)?.apiKey
      })
    }
  })

  const nextIDs = {}
  for (let i = 0; i < orderedItemTypes.length; i++) {
    const name = orderedItemTypes[i]
    const type = itemTypes.find((t) => t.name === name)
    if (!type) {
      console.error(`No item type found: ${name}`)
      break
    }
    // prettier-ignore
    const {
      id,
      // Type creation can fail when titleField is defined
      titleField,
      ...itemType
    } = type

    try {
      const record = await client.itemType.create(itemType)
      nextIDs[record.apiKey] = record.id
      console.log("created Item Type", record.name)

      for (let j = 0; j < itemType.fields.length; j++) {
        const field = fields.find((f) => f.id === itemType.fields[j])
        console.log(`Creating field: ${field.label} ${field.apiKey}`)
        const richItemTypes = field.validators.richTextBlocks?.itemTypes
        const linkItemTypes = field.validators.itemItemType?.itemTypes
        if (richItemTypes) {
          field.validators.richTextBlocks.itemTypes = richItemTypes.map(
            (key) => nextIDs[key]
          )
          console.log("Creating linked field")
        }
        if (linkItemTypes) {
          field.validators.itemItemType.itemTypes = linkItemTypes.map(
            (key) => nextIDs[key]
          )
          console.log("Creating linked field")
        }
        try {
          // some fields can reference other itemTypes
          if (field.id) {
            const { id, ...attr } = field
            const nextField = await client.field.create(record.id, attr)
            console.log(`Created field: ${nextField.label}`)
          }
        } catch (e) {
          console.log(`Could not create field: ${field.label} ${field.apiKey}`)
        }
      }
    } catch (e) {
      console.error(`Error creating Item Type: ${itemType.name} - ${e.message}`)
      errors.push(e)
    }
  }

  if (errors.length) {
    fs.writeFileSync("datocms-errors.log", JSON.stringify(errors, null, 2))
    return errors
  }
  return null
}

module.exports = importContent
