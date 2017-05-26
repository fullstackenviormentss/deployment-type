# deployment-type

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
