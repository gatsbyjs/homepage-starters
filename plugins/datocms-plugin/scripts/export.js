require("dotenv").config({
  path: ".env.development",
})
const SiteClient = require("datocms-client").SiteClient
const fs = require("fs")
const path = require("path")
const axios = require("axios")
const client = new SiteClient(process.env.DATOCMS_API_TOKEN)

console.log("Downloading DatoCMS records...")

const data = {}

// https://www.datocms.com/docs/import-and-export/export-data
async function exportContent() {
  data.items = await client.items.all({}, { allPages: true })

  const site = await client.site.find()
  const uploads = await client.uploads.all({}, { allPages: true })
  await uploads.reduce((chain, upload) => {
    return chain.then(() => {
      return new Promise((resolve) => {
        const imageUrl = "https://" + site.imgixHost + upload.path
        console.log(`Downloading ${imageUrl}...`)
        const stream = fs.createWriteStream(
          path.join(".", "scripts", "assets", path.basename(upload.path))
        )
        axios({
          method: "get",
          responseType: "stream",
          url: imageUrl,
        }).then((res) => {
          res.data.pipe(stream)
        })
        stream.on("close", resolve)
      })
    })
  }, Promise.resolve())

  /*
    .then(() => {
      return client.site.find()
    })
    .then((site) => {
      return client.uploads.all({}, { allPages: true }).then((uploads) => {
        return uploads.reduce((chain, upload) => {
          return chain.then(() => {
            return new Promise((resolve) => {
              const imageUrl = "https://" + site.imgixHost + upload.path
              console.log(`Downloading ${imageUrl}...`)
              const stream = fs.createWriteStream(
                path.join(".", "scripts", "assets", path.basename(upload.path))
              )
              axios({
                method: "get",
                responseType: "stream",
                url: imageUrl,
              }).then((res) => {
                res.data.pipe(stream)
              })
              stream.on("close", resolve)
            })
          })
        }, Promise.resolve())
      })
    })
  */

  data.itemTypes = await client.itemTypes.all()

  data.fields = []

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
  console.log("Got all items and itemTypes")
}

exportContent(process.env.DATOCMS_API_TOKEN)
