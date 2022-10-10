const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "afk",
    aliases: ["afk"],
    execute: async (client, message, args, embed, author, channel, guild) => {
if(message.channel.id !== "982318969140703262") return message.channel.send(`Bu komut sadece <#${"982318969140703262"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 8000}))
        if (message.member.displayName.startsWith("[AFK]")) return;
        let uye = guild.members.cache.get(author.id);
        let reason = args.slice(0).join(' ') || "Belirtilmemiş bir";
        let nick = uye.displayName;
        db.set(`sebep_${author.id}_${guild.id}`, reason);
        db.set(`user_${author.id}_${guild.id}`, author.id);
        db.set(`afktime_${guild.id}`, Date.now());
        db.set(`nick_${author.id}_${guild.id}`, nick);
        let sebep = db.fetch(`sebep_${author.id}_${guild.id}`);
        message.member.setNickname(`[AFK]`  + nick).catch(err => console.log(" "))
        channel.send(embed.setDescription(`${author} başarıyla **${sebep}** sebep ile AFK moduna giriş yaptınız.`)).then((x) => x.delete({ timeout: 5000 }));
        message.react(config.emojis.accept)

    }
}