// https://www.datocms.com/docs/import-and-export/importing-data#step-3-importing-to-datocms
const fs = require("fs")
const uniq = require("lodash.uniq")
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
  const client = new SiteClient(token)
  const { itemTypes, fields, items } = data

  const nextItemTypes = []
  const errors = []

  // map itemType ids to names
  items.forEach((item) => {
    item.itemType = itemTypes.find((t) => t.id === item.itemType)?.name
    if (!item.itemType) {
      throw new Error(`Missing itemType: ${item}`)
    }
  })

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
      nextItemTypes.push(record)
      for (let j = 0; j < itemType.fields.length; j++) {
        const field = fields.find((f) => f.id === itemType.fields[j])
        try {
          // some fields can reference other itemTypes
          if (field.id) {
            const { id, ...attr } = field
            const nextField = await client.field.create(record.id, attr)
          }
        } catch (e) {
          const existingNextField = await client.field.find(field.apiKey)
          if (existingNextField.id) {
            console.log(`${field.label} already created`)
          } else {
            console.error(`Error creating field ${field.label}`)
            errors.push(e)
            fs.writeFileSync(
              "datocms-errors.log",
              JSON.stringify(errors, null, 2)
            )
          }
        }
      }
      console.log("created Item Type", record.name)
    } catch (e) {
      console.error(`Error creating Item Type: ${itemType.name} - ${e.message}`)
      errors.push(e)
      // throw new Error(e)
      // TODO handle existing item Types
      fs.writeFileSync("datocms-errors.log", JSON.stringify(errors, null, 2))
    }
  }

  console.log("Importing content")
  fs.writeFileSync(
    "temp-items.json",
    JSON.stringify({ items, __itemTypes: nextItemTypes }, null, 2)
  )

  for (let i = 0; i < items.length; i++) {
    const { id, meta, creator, updatedAt, createdAt, ...item } = items[i]
    // remap new itemType ids based on name
    item.itemType = nextItemTypes.find((t) => t.name === item.itemType).id
    try {
      const record = await client.item.create(item)
    } catch (e) {
      console.error(`Error creating item: ${id} - ${e.message}`)
      errors.push(e)
      fs.writeFileSync("datocms-errors.log", JSON.stringify(errors, null, 2))
    }
  }

  /* TODO
    const image = await client.uploadFile(
      dogBreed.image_url,
      {
        defaultFieldMetadata: {
          en: {
            alt: `${dogBreed} dog`
          }
        },
        notes: `Imported from external source`,
      }
    )
    */

  if (errors.length) {
    fs.writeFileSync("datocms-errors.log", JSON.stringify(errors, null, 2))
  }
}

console.log(
  `Importing ${data.items.length} DatoCMS Items and ${data.itemTypes.length} Item Types`
)

importContent(process.env.DATOCMS_API_TOKEN)

/*
const data = [
  {
    "id": 1,
    "breed": "Alapaha Blue Blood Bulldog",
    "bred_for": "Guarding",
    "category": "Mixed",
    "description": "The Alapaha Blue Blood Bulldog is a well-developed, exaggerated bulldog with a broad head and...",
    "life_span": "12 - 13 years",
    "image_url": "https://cdn2.thedogapi.com/images/kuvpGHCzm.jpg"
  },
]
*/
