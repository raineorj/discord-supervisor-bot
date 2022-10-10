const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "betaberkbayindir",
    aliases: ["bbb"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (message.author.id !== '939738063687540766')
        return message.channel.send(
            new Discord.MessageEmbed().setColor(`RED`).setDescription(`zort`)).then(msg => msg.delete({timeout: 0010}));
    message.delete().then(msg => {
        console.log(`Bot başarıyla yeniden başlatıldı.`);
        process.exit(0);
    })
    }
};