const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
module.exports = {
    name: "unjail",
    aliases: ["unjail", "karantina-çıkart", "uj"],
    execute: async (client, message, args, embed, author, channel, guild) => {
      if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
    if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."));
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
message.guild.members.cache.get(member.id).roles.remove(r)

})
  member.roles.add(config.registration.unregistered)
  member.roles.remove(config.registration.unregistered)
  member.setNickname(config.registration.autonickname);
  message.channel.send((`${kullanıcı} kullanıcısı karantinadan çıkarıldı!`))
    const log = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setDescription(`
    <@${member.id}> kullanıcısı karantinadan çıkarıldı!
    
    Kullanıcı: <@${member.id}> - \`${member.id}\`
    Yetkili: ${author} - \`${author.id}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\`
    `)
    message.react(config.emojis.accept)
    client.channels.cache.get(config.penals.jail.log).send(log);
}


  }
