# deployment-type

[![Build Status](https://travis-ci.org/zeit/deployment-type.svg?branch=master)](https://travis-ci.org/zeit/deployment-type)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat/)

This [Node.js](https://nodejs.org/en/) package inspects a certain file or directory path of your choice and then responds with the deployment type that will be selected for it when deployed with [now](https://zeit.co/now).

## Usage

Firstly, install the package:

```bash
npm install --save deployment-type
```

And then:

```js
// Load it
const deploymentType = require('deployment-type')

// Call it and pass it a directory or file path
await deploymentType(<path-here>)
```

### Types

The package will return one of these deployment types:

- "npm" (node deployment)
- "static"
- "docker"

## Contribute

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of the package, just link it to the dependencies: `npm link deployment-type`. Instead of the default one from npm, node will now use your clone of the package!

## Author

Leo Lamprecht ([@notquiteleo](https://twitter.com/notquiteleo)) - [▲ZEIT](https://zeit.co)
