const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
    name: "topkayıt",
    aliases: ["topregister", "top-kayıt", "topteyit", "top-teyit", "topteyıt", "top-teyıt"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let uye = message.mentions.users.first() || message.author;
        let bilgi = db.get(`toplam_${uye.id}`);

        let top = message.guild.members.cache.filter(uye => db.get(`toplam_${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`toplam_${uye2.id}`)) - Number(db.get(`toplam_${uye1.id}`))).slice(0, 20).map((uye, index) => `\`${index+1}.\`` + " <@" + uye + "> \`" + db.get(`toplam_${uye.id}`) + " kayıt\`").join('\n')
        channel.send(embed.setDescription("Toplam kayıtlar:").setDescription("Top 20 kayıt sıralaması aşağıda belirtilmiştir.\n \n" + top))
    }
}