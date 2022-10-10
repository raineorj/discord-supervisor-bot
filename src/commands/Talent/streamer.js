const config = require("../../../config.json")
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "streamer",
    aliases: ["streamerver"],
    execute: async (client, message, args, embed, author, channel, guild) => {
      if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.roles.cache.has("989546866603618344") && !message.member.hasPermission("ADMINISTRATOR")) return channel.error(message, "Komutu kullanabilmek için geçerli yetkin olmalı.")
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return channel.error(message, "Geçerli bir kullanıcı belirtmelisin!")
        if (member.id === author.id) return channel.error(message, "Kendine rol veremezsin!")
        guild.members.cache.get(member.id).roles.add(config.roles.streamer)
        channel.send(embed.setDescription(`${member} kullancısına <@&${config.roles.streamer}> rolü verildi.\n <#980925856526504012> kanalını okumayı ihmal etme!`));
    }
}