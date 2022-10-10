const Discord = require("discord.js");
const conf = require("../../../config.json");
module.exports = {
    name: "rolsüz",
    aliases: ["rolsüzz"],
    execute: async (client, message, args, embed, author, channel, guild) => {

if (!message.member.roles.cache.get(conf.registration.staff))
return message.channel.send(new MessageEmbed()
.setDescription(`Gerekli yetkiye sahip değilsin.`)
.setColor('BLACK')).then(x => x.delete({timeout: 5000}));

let rolsuztanim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    rolsuztanim.forEach(r => {
r.roles.add("989505857240838155") //rolsüz id
})
const ver = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setDescription("Sunucuda rolü olmayan \`"+ rolsuztanim.size +"\` kişiye kayıtsız rolü verildi!")
.setColor("BLACK")
message.channel.send(ver)
} else if(!args[0]) {
const kayıtsız2 = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setDescription("Sunucumuzda rolü olmayan \`"+ rolsuztanim.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
.setColor("BLACK")
message.channel.send(kayıtsız2)
}
    }

}