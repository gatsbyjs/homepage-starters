require("dotenv").config({
  path: ".env.development",
})
const SiteClient = require("datocms-client").SiteClient
const fs = require("fs")
const path = require("path")
const client = new SiteClient(process.env.DATOCMS_API_TOKEN)

console.log("Exporting DatoCMS Models...")

// https://www.datocms.com/docs/import-and-export/export-data
async function exportContent() {
  const data = {}
  data.fields = []
  data.itemTypes = await client.itemTypes.all()

  for (let i = 0; i < data.itemTypes.length; i++) {
    const itemType = data.itemTypes[i]
    for (let j = 0; j < itemType.fields.length; j++) {
      const fieldID = itemType.fields[j]
      const field = await client.fields.find(fieldID)
      data.fields.push(field)
    }
  }

  const json = JSON.stringify(data, null, 2)
  fs.writeFileSync("scripts/data.json", json)
  console.log("Exported Models and Fields from DatoCMS")
}

exportContent()
