require("dotenv").config({
  path: ".env.development",
})
const SiteClient = require("datocms-client").SiteClient
const fs = require("fs")
const path = require("path")
const axios = require("axios")
const client = new SiteClient(process.env.DATOCMS_API_TOKEN)

console.log("Downloading DatoCMS records...")

// https://www.datocms.com/docs/import-and-export/export-data
client.items
  .all({}, { allPages: true })
  .then((response) => {
    fs.writeFileSync("scripts/data.json", JSON.stringify(response, null, 2))
  })
  .then(() => {
    return client.site.find()
  })
  .then((site) => {
    client.uploads.all({}, { allPages: true }).then((uploads) => {
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

console.log("Got records")
