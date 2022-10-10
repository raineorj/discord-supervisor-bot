const { Client, MessageEmbed, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const { readdir } = require("fs");
const config = require("./config.json");
const db = require("quick.db");
const moment = require('moment');
moment.locale("tr");
const ms = require("ms");
const { GuildMember } = require("discord.js");
require("moment-duration-format");
const buttons = require('discord-buttons');
buttons(client)
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];

require("./src/helpers/function")(client);

readdir("./src/commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let prop = require(`./src/commands/${f}/` + file);
                console.log(`Ashera ${prop.name} adlı komut yüklendi!`);
                commands.set(prop.name, prop);
                prop.aliases.forEach(alias => {
                    aliases.set(alias, prop.name);
                });
            });
        });
    });
});

readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop)
        console.log(`[Ashera Event] ${prop.conf.name} yüklendi!`);
    });
});

client.on("message", async message => {
    if (message.content === "anasininamiymisbutonrol" && message.author.id === config.bot.owner) {
        const Giveaway = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("Çekiliş Katılımcısı")
            .setID("Giveaway");
        const Activity = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("Etkinlik Katılımcısı")
            .setID("Activity");

        message.channel.send(`
Merhaba **2027** üyeleri,
Çekiliş katılımcısı alarak <:ashera_nitro:1015549035718905908> , <:ashera_spotify:1015548780671684669> , <:ashera_netflix:1015548776158605354> , <:ashera_exxen:1015548772488597504> , <:ashera_blutv:1015548766562037760>  gibi çeşitli ödüllerin sahibi olabilirsiniz.
Etkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.

__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__
`,
            {
                buttons: [Giveaway, Activity]
            });
    }

    if (message.content === ".button" && message.author.id === config.bot.owner) {

        const one = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("I")
            .setID("one");

        const two = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("II")
            .setID("two");

        const three = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("III")
            .setID("three");

        const four = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("IV")
            .setID("four");

        const five = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("V")
            .setID("five");
        message.channel.send("**Merhaba!** \n\n Aşşağıdaki butonlarla etkileşime girerek **sunucumuzdaki durumunuz hakkında bilgi edinebilirsiniz.** \n\n **1 -** `Sunucumuza daha önceden hangi isimlerle kayıt olduğunuzu kontrol edersiniz.` \n **2 -** `Sunucumuza daha önceden kayıt olup olmadığınızı kontrol edersiniz.` \n **3 -** `Sunucumuzda daha önceden ceza alıp almadığınızı kontrol edersiniz.` \n **4 -** `Sunucumuzdaki rollerinizi kontrol edersiniz.` \n **5 -** `Sunucumuza ne zaman katıldığınızı kontrol edersiniz.`", { buttons: [one, two, three, four, five] })
    }
});

client.login(config.bot.token).then(x => console.log(`Bot ${client.user.username} olarak giriş yaptı!`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`));

client.on('message', async message => {
if (message.content === '!fakekatıl') { 
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

GuildMember.prototype.setRol = function (roles = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(roles);
    return this.roles.set(rol);
};


client.YasaklıTag = function (user, options = {}) {
    if (!user) return false;
    let Yasaklılar = config.YasakliTaglar.filter(tag => tag.activity == true),
        Tags = [];

    Yasaklılar.forEach((item) => {
      if (item.type && item.type == "username" && String(user.username).includes(item.tag)) Tags.push(item)
      else if (item.type && item.type == "discriminator" && String(user.discriminator).includes(item.tag)) Tags.push(item);
    });

    if(options.type == "tags") return {
      Tags: Tags.map(xd => xd),
      Taglimi: Tags.length > 0 ? true : false
    };

    return Tags.length > 0 ? true : false;
  };

  /// etiket tag rol
