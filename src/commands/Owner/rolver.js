const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../../../config.json");

module.exports = {
    name: "rolver",
    aliases: ["rol", "r"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.Guild.emperor) && !message.member.hasPermission("981894039559372819")) return channel.send("Komutu kullanabilmek için geçerli yetkin olmalı.");
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args[1]))
    if (!uye) return message.channel.send(embed.setDescription(`Bir kullanıcı etiketlemelisin.`))
    if (!rol) return message.channel.send(embed.setDescription(`Bir rol etiketlemelisin.`))
    if (uye.roles.cache.has(rol.id)) {
        uye.roles.remove(rol.id)
        message.channel.send(embed.setDescription(`${uye} adlı kullanıcıdan ${rol} rolü alındı.`))
    }
    if (!uye.roles.cache.has(rol.id)) {
        uye.roles.add(rol.id)
        message.channel.send(embed.setDescription(`${uye} adlı kullanıcıya ${rol} rolü verildi.`))

    }
 }
}