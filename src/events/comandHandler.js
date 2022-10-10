const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require('ms');

module.exports = async (message) => {
    if (!message.guild || message.author.bot) return
      const owner = client.users.cache.get("796263552771817472");
    if (["tag", "!tag", ".tag", "-tag", "#tag"].some(x => message.content === x)) {
        message.channel.send(`\`ásh,áshera,²⁰²⁷,#2027\``)
    }
      const ownerr = client.users.cache.get("796263552771817472");
    const afkembed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.member.displayName)
        .setTimestamp()
    const etiket = message.mentions.users.first()
    const uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    const nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if (etiket) {
        const reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
        const uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
        if (message.content.includes(uye2)) {
            const time = db.fetch(`afktime_${message.guild.id}`);
            const timeObj = ms(Date.now() - time);
            message.channel.send(afkembed.setDescription(`${etiket} üyesi **${reason}** sebebiyle AFK.`).setColor("RANDOM"))
        }
    }
    if (message.author.id === uye) {
        message.member.setNickname(nickk).catch(err => console.log(" "))
        db.delete(`sebep_${message.author.id}_${message.guild.id}`)
        db.delete(`user_${message.author.id}_${message.guild.id}`)
        db.delete(`nick_${message.author.id}_${message.guild.id}`)
        db.delete(`user_${message.author.id}_${message.guild.id}`);
        db.delete(`afktime_${message.guild.id}`)
        message.channel.send(afkembed.setDescription(`Başarıyla **AFK** modundan çıkış yaptın.`)).then((x) => x.delete({ timeout: 5000 }));
    }
    if (!message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
//SETFOOTER
    if (cmd) {
        if (cmd.owner && config.bot.owner !== author.id) return
        if (cmd.guildowner && config.bot.owner !== author.id && guild.owner.id !== author.id) return
        if (client.cooldown.has(author.id) === config.bot.cooldown) {
            client.commandblocked.push(author.id)
            channel.send(embed.setDescription(`${author} Komutları kötüye kullandığın için engellendin.`))
        }
        if (client.commandblocked.includes(message.author.id)) return
        cmd.execute(client, message, args, embed, author, channel, guild);
        if (config.bot.owner !== author.id && guild.owner.id !== author.id) {
            if (!client.cooldown.has(author.id)) client.cooldown.set(author.id, 1);
            else client.cooldown.set(author.id, client.cooldown.get(author.id) + 1);
        }
        setTimeout(() => {
            if (client.cooldown.has(author.id)) {
                client.cooldown.delete(author.id)
            }
        }, 1000 * 60 * 5);
    }
}

module.exports.conf = {
    name: "message"
}
