const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["sayy", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
       if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("981894039559372819")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
        var TotalMember = message.guild.memberCount
        var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
        var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;        var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        var Taglı2 = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag2)).size;
        var Taglı3 = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag3)).size;
        var Taglı4 = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag4)).size;
        let Etiketiniz = message.guild.members.cache.filter(u => u.user.discriminator.includes(config.registration.etikettag)).size;
        let toplamTag = Taglı + Taglı2 + Taglı3 + Taglı4
        var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
        var Boost = message.guild.premiumSubscriptionCount;

        message.react(config.emojis.accept)
        
        message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`
    <a:ashera_hash:982700350991659038> Sunucumuzda toplam **${TotalMember}** kullanıcı bulunuyor.
    <a:ashera_custom:982700357538959441> Sunucumuzda toplam **${Online}** aktif kullanıcı bulunuyor.
    <a:ashera_emerald:982700353529200660> Toplam **${toplamTag}** kişi **(isim)** tagımıza sahip. **(${Etiketiniz} Etiket)**
    <a:ashera_diamond:982700360521089064> Seste **${Voice}** kullanıcı bulunuyor.
    <a:ashera_booster:982701530371207209> Toplam **${Boost}** boost basılmış. **(${message.guild.premiumTier} seviye)**
    `)).then((x) => x.delete({ timeout: 270000 }));
      
    }
}
