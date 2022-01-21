#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// make dist & clean up
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

fs.readdirSync('dist').map(dirname => {
  console.log('Deleting: ', dirname)
  fs.rmdirSync(path.join('dist', dirname), { recursive: true })
})

const starters = fs.readdirSync('plugins')

console.log(`Preparing ${starters.length} starters for publishing...`)

const createStarterDist = (dirname) => {
  // This assumes the dirname is the same as the CMS
  const name = `gatsby-starter-${dirname}-homepage`
  const files = [
    'src',
    'gatsby-browser.js',
  ]
  fs.mkdirSync(path.join('dist', name))
}

const createPackageJSON = (name) => {
}

starters.forEach(createStarterDist)
