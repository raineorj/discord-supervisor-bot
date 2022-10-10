const config = require("../../../config.json");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "warn",
    aliases: ["uyarı", "uyar"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
        if (!message.member.roles.cache.has(config.penals.warn.staff) && !message.member.hasPermission(config.Guild.emperor)) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."))
        const member =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const reason = args.splice(1).join(" ")
        if (!member) return channel.send(embed.setDescription("Geçerli bir kullanıcı belirtmelisin!"))
        if (!reason) return channel.send(embed.setDescription("Geçerli bir sebep belirtmelisin!"))
        if (!message.member.hasPermission(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return channel.send("Aynı veya yüksek yetki!")
        db.push(`warns_${member.id}`, `${author} tarafından **__${moment(Date.now()).format("LLL")}__** tarihinde **${reason}** sebebiyle uyarılmış!`)
        db.push(`sicil_${member.id}`, `${author} tarafından **__${moment(Date.now()).format("LLL")}__** tarihinde **${reason}** sebebiyle uyarılmış!`)
        db.add(`ceza_${guild.id}`, 1)
        channel.send(embed.setDescription(`${member} kişisi **${reason}** sebebiyle uyarı aldı! (Ceza Numarası: \`#${db.fetch(`ceza_${guild.id}`)}\`)`))
        const user = client.users.cache.get(member)
        const log = new MessageEmbed()
        .setColor("RANDOM")
        .addField("Ceza ID",  `\`#${db.fetch(`ceza_${guild.id}`)}\``)
        .addField('Uyarılan:', `${member} - \`${member.id}\``)
        .addField('Uyaran:', `  ${author} - \`${author.id}\``)
        .addField('Uyarı sebebi', `\`${reason}\``)
        .addField("Uyarılma Tarihi", `\`${moment(Date.now()).format("LLL")}\``)
        message.react(config.emojis.accept)
        client.channels.cache.get(config.penals.warn.log).send(log)
    }
}