const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "dağıt",
    aliases: ["dagit", "dagıt"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if(message.channel.id !== "980925862625026106") return message.channel.send(`Bu komut sadece <#${"980925862625026106"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
    if (!message.member.hasPermission(8)) return;
    let pubID = "980925856794964029"

    let pubatılcaklar = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === false)
    let sleep = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === true)

    let kanallar = message.guild.channels.cache.filter(s => s.parentID === pubID)
    let sleepID = "980925857336012833"
    sleep.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(sleepID)
        }, index * 2000)
    })
    pubatılcaklar.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(kanallar.random())
        }, index * 2000)
    })
    embed.setDescription(`${sleep.size} Adet kullanıcı sleep odalara taşındı. 
    ${pubatılcaklar.size} Adet kullanıcı public odalara dağıtıldı.`)
    message.channel.send(embed)
    }
}
