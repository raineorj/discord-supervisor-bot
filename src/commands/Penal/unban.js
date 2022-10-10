const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../../config.json")
moment.locale("tr")
module.exports = {
  name: "unban",
  aliases: ["banremove"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
    const permError = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setDescription('Komutu kullanabilmek için geçerli yetkin olmalı.')
    const userError = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setDescription('Geçerli bir ID belirtmelisiniz!')
    const userError2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setDescription("Harf koyma!")
    const userError3 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setDescription('Kullanıcı yasaklanmamış!')
    const levelError = new Discord.MessageEmbed()
      .setColor("RANDOM")
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setDescription('Aynı veya yüksek yetki!')
    if (!message.member.hasPermission(config.Guild.emperor)) return channel.send
      (permError)
    let user = args[0];
    if (!user) return channel.send
      (userError).catch(console.error)
    if (isNaN(args[0])) return channel.send
      (userError2).catch(console.error)
    if (user.highestRole >= author.highestRole) return channel.send
      (levelError)
    const banList = await guild.fetchBans();
    if (!user.id === banList) return channel.send
      (userError3)

    guild.members.unban(user);
    channel.send(`<@!${user}> **(${user})** kullanıcısının yasağı ${author} tarafından başarıyla kaldırıldı!`)
    message.react(config.emojis.accept)
    const log = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Esquel ❤️")
      .setDescription(`
      <@${user}> üyesinin yasağı kaldırıldı!
      
     Kullanıcı: <@${user}> - \`${user}\`
     Yetkili: ${author} - \`${author.id}\`
     Tarih: \`${moment(Date.now()).format("LLL")}\`
      `)
    client.channels.cache.get(config.penals.unban.log).send(log);
  }
}
