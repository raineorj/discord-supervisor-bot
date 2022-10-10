const db = require("quick.db");
const config = require("../../config.json");
const moment = require("moment");
const client = global.client;
moment.locale("tr");
require("moment-duration-format");
const { MessageEmbed, Message } = require("discord.js")



module.exports = async member => {
console.log(client.YasaklıTag(member.user)== true)
require("moment-duration-format")
var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()

    var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [yıl], M [ay]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    const date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    let yarrakguvenirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    string = string.trim();
    const endAt = member.user.createdAt
    const gün = moment(new Date(endAt).toISOString()).format('DD')
    const ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    const yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    const saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    const kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
  
    if(client.YasaklıTag(member.user) == true) {
        member.roles.add(config.penals.jail.roles)
        member.guild.channels.cache.get(config.channels.welcomechannel).send(`${member.user} sunucuya yasaklı tag ile giriş yaptığı için karantinaya atıldı.`)
    } else  if (kurulus > 604800000) {
        
        
        member.setNickname(config.registration.autonickname);
        member.guild.channels.cache.get(config.channels.welcomechannel).send(`
<:ashera_bluetick:997227675561250848> Merhabalar ${member} aramıza hoş geldin. Seninle beraber sunucumuz **${üyesayısı}** üye sayısına ulaştı.

Hesabın <t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:f> tarihinde oluşturulmuş. (<t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:R>)
        
Sunucumuza kayıt olduğunda **kurallar** kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu 

kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız. 🎉`);
member.roles.add(config.registration.unregistered);
    } else {
        member.setNickname(config.registration.susoeciosnickname);
        member.roles.add(config.registration.suspecios);
        member.setNickname(config.registration.autonickname);
        member.guild.channels.cache.get(config.channels.welcomechannel).send(
            new MessageEmbed()
                .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setDescription(`${member}, kullanıcısı sunucuya katıldı, hesabı **${zaman2}** önce açıldığı için şüpheli rolü verildi.`)
                .setTimestamp());
    } 

}

module.exports.conf = {
    name: "guildMemberAdd"
}