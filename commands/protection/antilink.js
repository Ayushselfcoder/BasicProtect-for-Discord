const db = require('quick.db');
const { DEFAULT_PREFIX } = require('../../config.json');
const { Embed } = require('../../build/functions');
let prefix = ''

module.exports.run = async (client, message, args) => {

    let prefix = await db.get(`config.${message.guild.id}.prefix`)

    if (prefix == undefined || prefix == null) prefix = DEFAULT_PREFIX

    if (!message.author) return
    if (message.author.id !== message.guild.ownerId) return Embed(message.author, `Sorry **${message.author.username}** you must be the owner to use this command.`, message.channel, '')
    let desc = ''

    if (!args[0]) {
        let status = await db.get(`config.${message.guild.id}.antilink`)
        if (status == true) {
            desc = `AntiLink **On** !`
        } else if (status == false) {
            desc = `AntiLink **Off** !`
        } else if (status == undefined) {
            desc = `Your AntiLink is **not configured** !`
        }
        Embed(message.author, desc, message.channel, `AntiLink`)
    }
    if (args[0]) {
        if (args[0] == 'on') {
            db.set(`config.${message.guild.id}.antilink`, true)
            Embed(message.author, `**AntiLink** has been **activated** successfully !`, message.channel, '')
        } else if (args[0] == 'off') {
            db.set(`config.${message.guild.id}.antilink`, false)
            Embed(message.author, `**AntiLink** has been **disabled** successfully !`, message.channel, '')
        } else {
            return message.reply(`invalid parameters`)
        }
    }
}

module.exports.help = {
    name: "antilink",
    aliases: [""],
    category: "protection",
    usage: `${prefix}antilink on/off`,
    description: "Enables or disables AntiLink", 
    cooldown: 5
}