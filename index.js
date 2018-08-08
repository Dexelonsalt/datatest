const Enmap = require("enmap")
const EnmapLevel = require("enmap-level")
const fs = require("fs")

const provider = new EnmapLevel({ name: "plixacmds", persistent: true })
const myColl = new Enmap({ provider: provider })

fs.writeFile("./data.json", '{ "tests": { "test": "hi" } }', (err) => {
    console.log(err)
    console.log(require("./data.json").tests.test)
})