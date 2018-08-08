const Discord = require("discord.js")
const Enmap = require("enmap")

const bot = new Discord.Client();
const commandProvider = new EnmapLevel({ name: "plixacmds", persistent: true })
const commands = new Enmap({ provider: commandProvider })

bot.on("ready", () => {
    console.log(bot.user.tag + " is ready.")
})

const token = require("./config.json").token
const prefix = "p-"
const ccPrefix = "plixa"

bot.on("message", (message) => {
    if (message.author.bot) return
    // if (!message.member.hasPermission(32))
    if (message.channel.id === "438701136539680780" || message.channel.id === '439737708898680832') {
        if (!Warns.has(message.guild.id)) return
        if (message.mentions.users.array()) {
            message.mentions.users.array().forEach(user => {
                let userObj = WarnUsers.get(user.id) || {
                    id: user.id,
                    warnings: 0,
                    reasons: []
                }
                if (!message.content.includes("for") || message.content.startsWith(prefix)) {
                    return;
                }
                if (message.content.includes("for") || !message.content.startsWith(prefix)) {
                    userObj.reasons.push(message.content)
                    userObj.warnings++
                    WarnUsers.set(user.id, userObj)
                }
            })
        }
    }
})

bot.on("message", (message) => {
    if (!message.content.startsWith(ccPrefix) || message.author.bot) return
    const args = message.content.slice(ccPrefix.length).trim().split(/ +/g);
    if (commands.has(args[0])) {
    message.channel.send(commands.get(args[0]).response)
    } else {
        return;
    }
})

bot.on("message", async (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    switch (args[0].toLocaleLowerCase()) {
        case "ping":
            message.channel.send('pong')
            break;
        case "eval":
            if (message.author.id !== "222794789567987712") {
                return;
            }
            try {
                let evalCode = eval(args.slice(1).join(" "))
                message.channel.send(evalCode + "        owo")
            } catch (e) {
                message.channel.send(e.message + " aaaa")
            }
            break;
        case "command":
            switch (args[1]) {
                case "create":
                    if (args[2] && args[3]) {
                        if (commands.has(args[2])) {
                            return message.channel.send("That command already exists.")
                        }
                        commands.set(args[2], ({ response: `${args.slice(3).join(" ")}`, ownerID: `${message.author.id}` }))
                        message.channel.send(`Command ${args[2]} created!`)
                        return;

                    }
                    if (!args[2] || !args[3]) return;
                case "delete":
            var cmdOwner = commands.get(args[2]).ownerID
                    if (args[2]) {
                        if (!commands.has(args[2])) {
                            message.channel.send("That command doesn't exist.")
                        }
                        if (message.author.id !== cmdOwner) {
                            message.channel.send("You are not the owner of this command.")
                            return;
                        } else {
                            commands.delete(args[2])
                            message.channel.send(`Command ${args[2]} deleted.`)
                            return;
                        }
                    } else {
                        message.channel.send("You must provide a command name.")
                        return;
                    }
                    break;
                    case "list":
                    message.channel.send(Array.from(commands.keys()).join(", "))
                    break;
            }
        }
    })

bot.login(token)