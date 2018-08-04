const Enmap = require("enmap")
const EnmapLevel = require("enmap-level")

const provider = new EnmapLevel({ name: "plixacmds", persistent: true })
const myColl = new Enmap({ provider: provider })

console.log(myColl.get('null'))