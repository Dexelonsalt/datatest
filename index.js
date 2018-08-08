const Enmap = require("enmap")
const EnmapLevel = require("enmap-level")
const fs = require("fs")

const provider = new EnmapLevel({ name: "tedts", persistent: true });

const myColl = new Enmap({ provider: provider })

    myColl.set('null', 'null announces null 2')
    console.log(myColl.get('null'))