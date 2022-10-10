const Discord = require("discord.js");
const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
  name: "sicil",
  aliases: ["siciller", "sicili"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("981894039559372819")) return channel.error(message, "Komutu kullanabilmek için geçerli yetkin olmalı.")
    let member = message.mentions.members.first() || guild.members.cache.get(args[0]);
    const points = db.fetch(`points_${member.id}`) || 0
    if (!member) return channel.error(message, "Geçerli bir kullanıcı etiketle!")
    let penals = db.get(`sicil_${member.user.id}`);
    if (!penals) return channel.send(`${member} kullanıcısının sicil geçmişi bulunmuyor.`)
    channel.send(embed
      .setColor("RANDOM")
      .setDescription(`**Kullanıcının sicil verileri:**`)
      .setDescription(`Kullanıcının sicil verileri;\n \n` + penals.map((data) => `${data}`).join("\n"))
      .addField("Toplam ceza puanı:", points))
  }
}