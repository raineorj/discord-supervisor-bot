const {MessageEmbed, Discord}= require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "çek",
    aliases: ["gel"],
    execute: async (client, message, args, embed, author, channel, guild) => {
if(message.channel.id !== "982318969140703262") return message.channel.send(`Bu komut sadece <#${"982318969140703262"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 5000}))
  if (!message.mentions.members.first()) {
      return message.reply(`Bir kullanıcı etiketlemelisin.`);
      };
  let target = message.guild.members.cache.get(message.mentions.members.first().id);
 //if (!message.member.roles.cache.has("981138411199025162")) return message.channel.send(`Bu komutu kullanmanız için tag almanız gerekiyor.`).then(x => x.delete({timeout: 5000}))
 if (!message.member.voice.channel) return message.channel.send(`Bir ses kanalında olman gerekiyor.`);

  if (!target.voice.channel) return message.channel.send("Bu Kullanıcı Bir Ses Kanalında Değil");
  if (message.member.voice.channel.id === target.voice.channel.id) return message.channel.send("Zaten aynı kanaldasınız.");
    let embeds = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    const reactionFilter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name) && user.id === target.id;
          };
          message.channel.send(`${target}`, {embed: embeds.setAuthor(target.displayName, target.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
            await msj.react('✅');
            msj.awaitReactions(reactionFilter, {max: 1, time: 1000*15, error: ['time']}).then(c => {
              let cevap = c.first();
        if (cevap) {
          target.voice.setChannel(message.member.voice.channelID);
                msj.delete();
                message.react("✅").catch();
        };
            });
          });
    }
}