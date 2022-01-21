#!/usr/bin/env node
const fs = require('fs-extra')
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
  const ignore = [
    'node_modules',
    'public',
    '.cache',
    '.env.development',
    '.env.production',
  ]
  fs.mkdirSync(path.join('dist', name))

  // copy root files
  const rootFiles = [
    'src',
    'gatsby-browser.js',
  ]
  rootFiles.forEach(file => {
    const dest = path.join('dist', name, file)
    fs.copySync(file, dest, {
      filter: n => !ignore.includes(n),
    })
  })

  // copy cms-specific files
  const files = [
    '.env.EXAMPLE',
    'gatsby-config.js',
    'gatsby-node.js',
    'package.json',
    'README.md',
  ]
  files.forEach(file => {
    const src = path.join('plugins', dirname, file)
    const dest = path.join('dist', name, file)
    if (!fs.existsSync(src)) return
    fs.copySync(src, dest)
  })
  const json = createPackageJSON(name)
  fs.writeFileSync(path.join('dist', name, 'package.json'), json, 'utf8')
}

const createPackageJSON = (name) => {
  console.log('Creating package.json for', name)
  const root = require('../package.json')
  const pkg = require(path.resolve('dist', name, 'package.json'))
  pkg.name = name
  pkg.private = true
  Object.entries(root.dependencies).forEach(([key, val]) => {
    pkg.dependencies[key] = val
  })
  pkg.scripts = {
    start: 'gatsby develop',
    develop: 'gatsby develop',
    build: 'gatsby build',
    serve: 'gatsby serve',
    clean: 'gatsby clean',
  }
  const json = JSON.stringify(pkg, null, 2)
  return json
}

starters.forEach(createStarterDist)
console.log(`Created ${starters.length} starters`)

// TODO: push to github repo
