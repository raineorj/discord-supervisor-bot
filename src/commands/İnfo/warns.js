const db = require("quick.db");
const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "warns",
    aliases: ["uyarılar", "uyarıları"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
        if (message.member.roles.cache.has(config.penals.warn.staff) && !message.member.hasPermission("981894039559372819")) return channel.error(message, "Komutu kullanabilmek için geçerli yetkin olmalı.")
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return channel.error(message, "Geçerli bir kullanıcı belirtmelisin!")
        const warns = await db.fetch(`warns_${member.id}`)
        if (!warns) return channel.send(embed.setDescription("Kullanıcının daha önceden uyarı geçmişi bulunmamakta!"))
        channel.send(embed.setDescription(`${warns.map((data) => `${data}`).join("\n")}`))
    }
}