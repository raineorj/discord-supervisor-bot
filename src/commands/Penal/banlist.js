const Discord = require('discord.js')
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "ban-liste",
  aliases: ["banlist"],
  execute: async (client, message, args, embed, author, channel, guild) => {
if (!message.member.roles.cache.has(config.Guild.emperor) && !message.member.hasPermission(config.Guild.emperor)) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."))

  
var userlist = message.guild.fetchBans()
userlist.then(collection => {
if(collection.first() == null){
  
const embed = new Discord.MessageEmbed()
.setTitle("Sunucunuzda Banlanan Kimse Yok!")      
.setColor("RANDOM")
message.channel.send(embed)
  
} else {
const data = collection.map(mr => "`"+mr.user.username+"`").slice(0, 500).join(", ")
const embed = new Discord.MessageEmbed()
.setTitle(":no_entry_sign:  Banned List")
.setColor("RANDOM")
.setDescription(data)
.setTimestamp()
message.channel.send(embed)
}
})
  }
}