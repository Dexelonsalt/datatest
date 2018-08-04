const Enmap = require("enmap")
const EnmapLevel = require("enmap-level")

const provider = new EnmapLevel({ name: "plixacmds", persistent: true })
const myColl = new Enmap({ provider: provider })

myColl.set('boolean', 'true');
myColl.set('integer', '42');
myColl.set('null', 'nope');

console.log(myColl.get('null'))