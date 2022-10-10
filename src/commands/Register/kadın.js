const db = require("quick.db");
const config = require("../../../config.json");
const moment = require("moment");

module.exports = {
    name: "kadın",
    aliases: ["k", "K", "KADIN"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(message.channel.id !== "980925853758259239") return message.channel.send(`Bu komut sadece <#${"980925853758259239"}> kanalından kullanılabilir.`).then(x => x.delete({timeout: 15000}))
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        let name = args[1].charAt(0).replace("i", "İ").toUpperCase() + args[1].slice(1)
        var age = args[2];
        const names = db.get(`isimler_${member.id}`)
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission(config.Guild.emperor)) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
        if (!member) return channel.send(embed.setDescription("Geçerli bir kullanıcı belirtmelisin!"))
        if (!name) return channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!"))
        if (!age) return channel.send(embed.setDescription("Geçerli bir yaş belirtmelisin!"))
        if (isNaN(age)) return channel.send(embed.setDescription("Yaş geçerli rakamlardan oluşsun!"))
        if (age < config.registration.minage) return channel.send(embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!"))
        if (config.registration.purchase) {
            if (!member.user.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole && config.roles.team)) {
                return channel.send(embed.setDescription(`<a:ashera_red:981188178897690624> Şuanda taglı alımdayız, kayıt etmek istediğin kullanıcıyı kayıt edebilmek için kullanıcının tagı alması gerekiyor.`))
            }
        }
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        db.add(`kadın_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
        db.push(`isimler_${member.id}`, ` \`• ${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` (**Kadın**)`);
        db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (**Kadın**)`)
        await guild.members.cache.get(member.id).roles.add(config.registration.woman);
        await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        if (!names) {
            channel.send(embed.setDescription(`<@${member.id}> kişisinin ismi ${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age} olarak değiştirildi.\n \n **Kadın** olarak kaydedildi.`))
            message.react(config.emojis.accept)
        } else {
            channel.send(embed.setDescription(`<@${member.id}> kişisinin ismi başarıyla ${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age} olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.\n\n<a:ashera_red:981188178897690624> Kişinin toplamda ${names.length} isim kayıtı bulundu.\n${names.map((data) => `${data}`).join("\n")}\n \nKişinin önceki isimlerine \`.isimler @üye\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.\n \n **Kadın** olarak kaydedildi.`))
            message.react(config.emojis.accept)
        }

        client.channels.cache.get(config.channels.chat).send(`${member} sunucuya kayıt oldu, aramıza hoş geldin!`).then(x => x.delete({timeout: 40000}))
    }
}