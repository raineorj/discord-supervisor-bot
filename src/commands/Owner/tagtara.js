const { MessageEmbed } = require('discord.js');
const config = require("../../../config.json");

module.exports = {
    name: "tagtara",
    aliases: ["tag-tara"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.Guild.emperor) && !message.member.hasPermission("981894039559372819")) return channel.send("Komutu kullanabilmek için geçerli yetkin olmalı.");
    let tag = (config.registration.GuilDTag)
    let rol = (config.roles.team)
    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol))
    let tagsizlar = message.guild.members.cache.filter(s => !s.user.username.includes(tag) && s.roles.cache.has(rol))
    taglilar.array().forEach(async (member, index) => {
        setTimeout(async () => {
            await member.roles.add(rol)
        }, index * 1000)
    })
    tagsizlar.array().forEach(async (member, index) => {
        setTimeout(async () => {
           // await member.roles.remove(rol)
           member.roles.set([config.registration.unregistered])
        }, index * 1000)
    })
    embed.setDescription(`
**${taglilar.size}** kişiye taglı rolü verildi.
**${tagsizlar.size}** kişiden taglı rolü alındı.
`)
    message.channel.send(embed)
 }
}