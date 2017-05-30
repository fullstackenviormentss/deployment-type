const {join} = require('path')
const test = require('ava')
const {readdirSync: readdir} = require('fs-extra')
const deploymentType = require('../')

const fixtures = join(__dirname, '_fixtures')

readdir(fixtures).forEach(fixture => {
  test(fixture, async t => {
    const [expected] = fixture.split('-')
    t.is(expected, await deploymentType(join(fixtures, fixture)))
  })
})
