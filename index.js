// Native
const path = require('path')

// Packages
const {readJSON} = require('fs-extra')
const pathExists = require('path-exists')
const pathType = require('path-type')

const fileNames = {
  nowJSON: 'now.json',
  pkg: 'package.json',
  dockerfile: 'Dockerfile'
}

const allowedTypes = [
  'node',
  'npm',
  'static',
  'docker'
]

const checkType = async (directory, paths) => {
  // If it's a file, it can only be of static nature
  if (await pathType.file(directory)) {
    return 'static'
  }

  // If it's a directory and contains a `now.json` file
  // with a type field, we always need to honor it
  if (await pathExists(paths.nowJSON)) {
    const content = await readJSON(paths.nowJSON)

    if (content.type) {
      if (!allowedTypes.includes(content.type)) {
        throw new Error('Deployment type specified in `now.json` is not allowed')
      }

      return content.type
    }
  }

  // If `now.json` doesn't exist, try the same for `package.json` and
  // the `now.type` field within it
  if (await pathExists(paths.pkg)) {
    const content = await readJSON(paths.pkg)

    if (content.now && content.now.type) {
      if (!allowedTypes.includes(content.now.type)) {
        throw new Error('Deployment type specified in `package.json` is not allowed')
      }

      return content.now.type
    }
  }

  // If a docker file exists, it can only be a docker deployment
  // A pure node deployment never needs a Dockerfile
  if (await pathExists(paths.dockerfile)) {
    return 'docker'
  }

  // If it's not a docker deployment and it contains
  // a package.json file, it can only be a node deployment
  if (await pathExists(paths.pkg)) {
    return 'npm'
  }

  // If it's not a file and doesn't contain any sort of
  // metafile, it's always of static nature
  return 'static'
}

module.exports = async directory => {
  let paths = {}

  for (const file in fileNames) {
    if (!{}.hasOwnProperty.call(fileNames, file)) {
      continue
    }

    const fileName = fileNames[file]
    paths[file] = path.join(directory, fileName)
  }

  return checkType(directory, paths)
}
