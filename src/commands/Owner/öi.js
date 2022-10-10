const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
    name: "özelisim",
    aliases: ["öi", "oi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        let name = args[1].charAt(0).replace("i", "İ").toUpperCase() + args[1].slice(1)
        var age = args[2]
        if (!message.member.roles.cache.has("ADMINISTRATOR") && !message.member.hasPermission(config.Guild.emperor)) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
        if (!member) return channel.send(embed.setDescription("Geçerli bir kullanıcı belirtmelisin!"))
        if (!name) return channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!"))
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name}\` **İsim Değiştirme**`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name}`);
        channel.send(embed.setDescription(`Kullanıcının ismi \`${config.registration.TagSymbol} ${name}\` olarak değiştirildi!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}