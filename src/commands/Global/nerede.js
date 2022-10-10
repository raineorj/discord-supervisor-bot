module.exports = {
    name: "nerede",
    aliases: ["ss", "n"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.channel.id !== "982318969140703262") return message.channel.send(`Bu komut sadece <#${"982318969140703262"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 5000}))
        let user = message.mentions.members.first() || guild.members.cache.get(args[0])
        if (!user) return channel.error(message, "Geçerli bir kullanıcı etiketle!")
        let sonuc; if (!user.voice.channelID) sonuc = `**${user}** kullanıcısı herhangi bir ses kanalında değil.`; if (user.voice.channelID) sonuc = `${user} kullanıcısı \`${user.voice.channel.name}\` isimli sesli odada.`
        channel.send(embed.setDescription(sonuc))
    }
}