const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed().setTimestamp()
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.TagSymbol) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.set([config.registration.unregistered])
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} - **${newUser.username}** isminden \`${config.registration.GuilDTag}\` çıkartarak tagımızdan ayrıldı!`))
        newUser.setNickname("•")
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.TagSymbol)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(`${newUser} -  (**${oldUser.username}**) tagımızı alarak aramıza katıldı!`).then(x => x.delete({timeout: 10000}))
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} -  (**${oldUser.username}**) tagımızı alarak tagımıza katıldı!`))
        newUser.setNickname("•")
        }
    }

    const guildID = (config.Guild.GuildID)
    const roleID = (config.roles.team)
    const tag = (config.registration.GuilDTag2)
    const chat = (config.channels.chat)
    const taglog = (config.logs.taglog)
  
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} kullanıcısı tagımızı çıkardığı için taglı rolü alındı.`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`${newUser} tagımızı alarak ailemize katıldı.`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} kullanıcısı tagımızı aldığı için taglı rolü verildi.`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == (config.registration.etikettag) && newUser.discriminator !== (config.registration.etikettag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı.`))
        } else if (oldUser.discriminator !== (config.registration.etikettag) && newUser.discriminator == (config.registration.etikettag)) {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} kullanıcısı etiket tagımızı aldığı için taglı rolü verildi.`))
            client.channels.cache.get(chat).send(`${newUser} etiket tagımızı alarak ailemize katıldı.`)
        }
    }
  
  }


module.exports.conf = {
    name: "userUpdate"
}