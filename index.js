const Enmap = require("enmap")
const Lvl = require("enmap-level")

const provider = new Lvl.EnmapLevel({ name: "test" })
const myColl = new Enmap({ provider: provider })

myColl.set('boolean', true);
myColl.set('integer', 42);
myColl.set('null', null);

console.log(myColl.get('null'))