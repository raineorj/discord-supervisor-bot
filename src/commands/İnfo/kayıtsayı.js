const db = require("quick.db");
module.exports = {
    name: "kayıtsayı",
    aliases: ["teyitlerim", "kayıtlarım", "teyit-sayi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
        var member = message.mentions.users.first() || client.fetchUser(args[0]) || author;
        let erkek = db.get(`erkek_${author.id}`) || 0;
        let kadın = db.get(`kadın_${author.id}`) || 0;
        let toplam = db.get(`toplam_${author.id}`) || 0;
        channel.send(embed.setDescription(`
 Toplam Kayıt: **${toplam}**
 
 Erkek Kayıt: **${erkek}**
 Kadın Kayıt: **${kadın}**`))
    }
}