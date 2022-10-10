const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const user = guild.members.cache.get(oldUser.id);
    console.log("Bir üye sunucuya giriş yaptı.")
    if (client.YasaklıTag(oldUser) == false && client.YasaklıTag(newUser) == true) {
   
     //   await oldUser.send(` Selam, isminizde yasaklı bir tag  tespit ettik. Bu nedenle sunucuda **Cezalı** olarak işaretlendin! Tagı isminden çıkardığın vakit cezan iptal edilecektir.`).catch(err => {})
     
        await user.setNickname(`• Yasaklı Tag`)
        console.log("İsmini yasaklı tag olarak değiştirdim.")
        await user.setRol(config.penals.jail.roles);
    } else if (client.YasaklıTag(oldUser) == true && client.YasaklıTag(newUser) == false) {
        const Taglar = client.YasaklıTag(oldUser, { type: "tags" });
      //  if (guild.channels.cache.has(Settings.Channels.Welcome)) guild.channels.cache.get(Settings.Channels.Welcome).send(`${global.emojis.tick} Selam, isminden **${Taglar.Tags[0].type == "username" ? Taglar.Tags[0].tag : `#${Taglar.Tags[0].tag}`}** tagını çıkardığın için teşekkürler. Tekrardan sunucumuza kayıt olabilirsin! ${oldUser.toString()}`).catch(err => {})
     //   await oldUser.send(`Selam, isminden yasaklı tagını çıkardığın için teşekkürler. Tekrardan sunucumuza kayıt olabilirsin!`)
        await user.setNickname(`• İsim | Yaş`)
        await user.setRol(config.registration.unregistered);
    };
}

module.exports.conf = {
    name: "userUpdate"
}