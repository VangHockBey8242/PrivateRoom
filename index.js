const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();

const fs = require("fs");

//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("El_VangHockBey Tarafından Kodlanmıştır.");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});

//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`ben kodladım`);
});

client.login(process.env.token);


const disbut = require('discord-buttons')
disbut(client);

client.on('message', async (message) => {
    if (message.content.startsWith('?yardım')) {
      let button = new disbut.MessageButton()
      .setStyle('red') 
      .setLabel('[NOT]')
      .setID('[NOT]')
      let embed = new Discord.MessageEmbed()
      .addField(`Catland Özel Oda Sistemi`,`\`• ?özelkanal oluştur <üyeSayısı> <kanalAdı>\`\n\`• ?özelkanal sil\`\n\`• ?özelkanal izin @üye\``)
      message.channel.send({
        button: button,
          embed: embed
      })
      client.ws.on('INTERACTION_CREATE', async interaction => {
          
          client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {
                      content: "```Ek Bilgi```\n **Sadece Komutlar <#934442750802280478> Kanalında Çalışmaktadır*!!***",
                      flags: "64"
                    }
                }
            }) 
       });
    }
});

client.on('ready', () => {
  client.channels.cache.get('926930385886134332').join();
})