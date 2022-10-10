const Discord = require('discord.js');
const config = require("../../../config.json")
const db= require('croxydb');

module.exports = {
    name: "snipe",
    aliases: ["sn"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.jail.staff) && !message.member.hasPermission("BAN_MEMBERS")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
    var kanal = message.mentions.channels.first();
    
    var silinenMesaj;// = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
    var silinenMesajSahip;// = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.sahipId`);
    var veriKontrol;// = db.has(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
    
    if (!kanal) {
        silinenMesaj = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
        silinenMesajSahip = db.get(`${message.guild.id}.silinenMesaj.${message.channel.id}.sahipId`);
        veriKontrol = db.has(`${message.guild.id}.silinenMesaj.${message.channel.id}.mesaj`);
        
        if (silinenMesaj == '')
            return message.channel.send('Silinen embed mesajlarının içeriğini gösteremiyorum.');
        
        var embed = new Discord.MessageEmbed()
            .setDescription('**<a:ashera_red:981188178897690624> Bu kanalda silinen son mesaj.**')
            .addField(`Mesaj sahibi:`, `<@${silinenMesajSahip}>`)
            .addField('Mesaj içeriği:', silinenMesaj)
            .addField('Mesajın silindiği kanal:', `<#${message.channel.id}>`)
            .setColor('RANDOM')
            
        message.channel.send({embed}).then(x => x.delete({timeout: 8000}));
    } else {
        silinenMesaj = db.get(`${message.guild.id}.silinenMesaj.${kanal.id}.mesaj`);
        silinenMesajSahip = db.get(`${message.guild.id}.silinenMesaj.${kanal.id}.sahipId`);
        veriKontrol = db.has(`${message.guild.id}.silinenMesaj.${kanal.id}.mesaj`);
        
        if (silinenMesaj == '')
            return message.channel.send('Silinen embed mesajlarının içeriğini gösteremiyorum.');
        
        var embed = new Discord.MessageEmbed()
            .setDescription('**<a:ashera_red:981188178897690624> Bu kanalda silinen son mesaj.**')
            .addField(`Mesaj sahibi:`, `<@${silinenMesajSahip}>`)
            .addField('Mesaj içeriği:', silinenMesaj)
            .addField('Mesajın silindiği kanal:', `<#${kanal.id}>`)
            .setColor('RANDOM').then(x => x.delete({timeout: 8000}))
            
        message.channel.send({embed});
    }
 }
}