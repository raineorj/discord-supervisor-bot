const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
module.exports = {
    name: "unregistered",
    aliases: ["unreg", "ks", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission(config.Guild.emperor)) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
 const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 console.log(config.registration.unregistered)
 await member.setRol(config.registration.unregistered)
 await member.setNickname(config.registration.autonickname);
 message.channel.send(embed.setDescription(`${member} kullanıcı başarıyla <@&${config.registration.unregistered}> rolüne atıldı.`))
 message.react(config.emojis.accept)
}


  }