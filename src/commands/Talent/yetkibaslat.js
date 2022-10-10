const config = require("../../../config.json")
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "yetkibaşlat",
    aliases: ["yetkibaslat", "yetki-başlat", "yetki-baslat", "yetkiver", "yetki"],
    execute: async (client, message, args, embed, author, channel, guild) => {
      if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.roles.cache.has(config.Guild.yetkilialimdm) && !message.member.hasPermission("ADMINISTRATOR")) return channel.error(message, "Komutu kullanabilmek için geçerli yetkin olmalı.")
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return channel.error(message, "Geçerli bir kullanıcı belirtmelisin!")
        if (member.id === author.id) return channel.error(message, "Kendini en alt yetkiden başlatamazsın!")
        guild.members.cache.get(member.id).roles.add(config.roles.enaltyetkibaslat)
        guild.members.cache.get(member.id).roles.add(config.registration.staff)
        guild.members.cache.get(member.id).roles.add(config.penals.mute.staff)
        guild.members.cache.get(member.id).roles.add("989505826924412929")
        channel.send(embed.setDescription(`${member} kullanıcısı başarıyla en alt yetkiden başlatıldı.`));
    }
}