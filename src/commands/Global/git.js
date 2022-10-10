const {MessageEmbed, Discord}= require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "git",
    aliases: ["Git"],
    execute: async (client, message, args, embed, author, channel, guild) => {
if(message.channel.id !== "982318969140703262") return message.channel.send(`Bu komut sadece <#${"982318969140703262"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 5000}))
if (!message.mentions.members.first()) {
return message.reply(`Bir kullanıcı etiketlemelisin`);};
 let kullanici = message.guild.members.cache.get(message.mentions.members.first().id);
//if (!message.member.roles.cache.has("981138411199025162")) return message.channel.send(`Bu komutu kullanabilmek için tag alman gerekiyor.`).then(x => x.delete({timeout: 5000}))
   if (!message.member.voice.channel) return message.channel.send(`Bir ses kanalında olman gerekiyor.`);
    if (!kullanici.voice.channel) return message.channel.send("Bu kullanıcı bir ses kanalında değil.");
 if (message.member.voice.channel.id === kullanici.voice.channel.id) return message.channel.send("Zaten aynı kanaldasınız.");
const filter = (reaction, user) => {
return ['✅'].includes(reaction.emoji.name) && user.id === kullanici.id;
};
let teklif = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`${kullanici}, ${message.author} **${kullanici.voice.channel.name}** odasına Gelmek istiyor.`);
 let mesaj = await message.channel.send(teklif)
 await mesaj.react("✅");
 mesaj.awaitReactions(filter, {
 max: 1,
    time: 1000 * 15,
       errors: ['time']
        }).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
                mesaj.edit("Başarılı bir şekilde odaya gittiniz.").then(x => x.delete({ timeout: 100 }))
                message.member.voice.setChannel(kullanici.voice.channel)
            } 
        }).catch(() => {
            mesaj.edit("Süre dolduğu için odaya gitme işleminiz iptal edildi").then(x => x.delete({timeout: 1000}))
        });
    }
}