const db = require("quick.db");
const config = require("../../../config.json")

module.exports = {
    name: 'kke',
    aliases: ["kayıt-yetkilisi", "kayiteden", "kayıteden", "teyiteden", "teyitçi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!member) return channel.error(message, "Geçerli bir kullanıcı belirtmelisin!")
        let kke = db.get(`kke_${member.id}`);
        if (!kke) return channel.error(message, "Bu kullanıcının kayıt geçmişi bulunmamakta!")
    channel.send(embed.setDescription("Belirttiğiniz kullanıcının kayıt görevlisi:").setDescription(`**Belirttiğiniz kullanıcının kayıt görevlisi;**\n \n` + `${kke.join("\n")}`))
    }
}