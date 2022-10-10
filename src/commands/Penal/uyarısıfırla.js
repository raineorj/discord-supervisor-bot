const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {
  name: "uyarısıfırla",
  aliases: ["uyarı-sifirla", "uyarısıfırla"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."));
  
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!member) channel.send(embed.setDescription(`Geçerli bir kullanıcı belirtmelisin!`))

if (!member) {
let warns = db.delete(`warns_${member.id}`) || [];
channel.send(embed.setDescription(`Uyarı verilerin silindi.`))
}
  
if(member) {
let warns = db.delete(`warns_${member.id}`) || [];
channel.send(embed.setDescription(`${member}  kullanıcısının uyarı verileri silindi.`))

};
  
}
  

  }
