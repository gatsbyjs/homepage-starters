// https://www.datocms.com/docs/import-and-export/importing-data#step-3-importing-to-datocms
const uniq = require("lodash.uniq")
const { SiteClient } = require("datocms-client")
const data = require("./data.json")

async function importContent(token) {
  const client = new SiteClient(token)
  for (let i = 0; i < data.length; i++) {
    const { id, meta, creator, updatedAt, createdAt, ...item } = data[i]
    const record = await client.item.create(item)
    console.log("created", item.id)
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
}

console.log(`Importing ${data.length} DatoCMS records`)

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
