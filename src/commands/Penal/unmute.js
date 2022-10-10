const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "unmute",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
    if (!message.member.roles.cache.has(config.penals.mute.staff) && !message.member.hasPermission(config.Guild.emperor)) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."))
    let member = message.member
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return channel.send(embed.setDescription('Geçerli bir kullanıcı belirtmelisin!'))
    user.roles.remove(config.penals.mute.roles);
    message.channel.send((`${user} üyesinin susturulması başarıyla kaldırıldı!`))
    const log = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Esquel ❤️")
      .setDescription(`
      ${member ? member.toString(): member.username} kullanıcısının susturması kaldırıldı!

      Kullanıcı: ${user} - \`${user.id}\`
      Yetkili: ${author} - \`${author.id}\`
      Tarih: \`${moment(Date.now()).format("LLL")}\`
      `)
      message.react(config.emojis.accept)
      db.set(`mute_${member.id}`, false)
    client.channels.cache.get(config.penals.mute.log).send(log);
  }
};
