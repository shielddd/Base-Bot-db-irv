const { MessageEmbed, Client, Collection, Intents } = require('discord.js');
const { token, prefix, author, founderId, founder, ownerbot } = require('./commands/settings.json');
const GBlacklisted = require('./commands/database/global_blacklist/blacklist.json');
const client = new Client({ disableMentions: "everyone" }, { ws: { intents: Intents.PRIVILEGED } });
const fs = require("fs");
const path = require("path");
const mv = require('mv');




client.commands = new Collection();

let commandDir = "commands";

for (const category of fs.readdirSync(`./${commandDir}`)) {
    if (!fs.statSync(`./${commandDir}/${category}`).isDirectory()) continue;
    const direc2 = fs.readdirSync(path.join(`./${commandDir}/${category}`)).filter(file => file.endsWith(".js"))
    for (const f of direc2) {
        const command = require(`./${commandDir}/${category}/${f}`);
        client.commands.set(command.name, command);
    }
    for (const folder of fs.readdirSync(`./${commandDir}/${category}`)) {
        if (!fs.statSync(`./${commandDir}/${category}/${folder}`).isDirectory()) continue;
        const direc = fs.readdirSync(path.join(`./${commandDir}/${category}/${folder}`)).filter(file => file.endsWith(".js"))
        for (const f of direc) {
            const command = require(`./${commandDir}/${category}/${folder}/${f}`);
            client.commands.set(command.name, command);
        }
        for (const files of fs.readdirSync(`./${commandDir}/${category}/${folder}`)) {
            const command = require(`./${commandDir}/${category}/${folder}/${files}`);

            client.commands.set(command.name, command);
        }
    }
}


process.setMaxListeners(300);

const { red, green, magenta, greenBright, magentaBright, yellowBright, blue, blueBright, grey, redBright, yellow, cyan, cyanBright } = require('chalk');

console.log(magenta(`

irv

`));


client.on("ready", () => {

    const userCount = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c, 0);
 
    console.log(magentaBright('              ════════════════════════════════════════════════════════════════════════════════'));
    console.log(magentaBright(`                                           BOT: ${client.user.username}#${client.user.discriminator} `));
    console.log(magentaBright('              ════════════════════════════════════════════════════════════════════════════════'));

    let ActiOptions = ["PLAYING", "STREAMING"];
    setInterval(function () {

        let randomsieActivity = ActiOptions[Math.floor(Math.random() * ActiOptions.length)];

        client.user.setActivity({
            name: `Protège: ${userCount}`,
            type: randomsieActivity,
            url: "https://www.twitch.tv/discord"
        });

    }, 10000); 
});

client.on("message", message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    
    if (message.content.startsWith(prefix)) {

        const d = new Date();
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

        console.log(green(`[COMMAND RAN] : ${message.content} | ${message.author.tag} | [SERVER] : ${message.guild.name} | [TIME] : ${date}`))

       
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return console.log("This command doesnt exist")

        try {
            client.commands.get(command).run(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }


})
const Discord = require('discord.js');
const ms = require('ms');
client.on('message', async message => {
    if(message.content.startsWith(`${prefix}embed`)){
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**Vous avez pas la permission de construire un embed.**")
        const embed = new Discord.MessageEmbed()
        .addFields(
            { name: '`1️⃣`', value: `**Modifié le titre
             de l'embed..**`, inline: true },
            { name: '`2️⃣`', value: `**Modifié la description 
            de l'embed.**`, inline: true },
            { name: '`3️⃣`', value: `**Modifié l'auteur 
            de l'embed.**`, inline: true },
            { name: '`4️⃣`', value: `**Modifié le footer 
            de l'embed.**`, inline: true },
            { name: '`5️⃣`', value: `**Modifié le thumbnail 
            de l'embed.**`, inline: true },
            { name: '`6️⃣`', value: `**Ajouté un timestamp 
            à l'embed.**`, inline: true },
            { name: '`7️⃣`', value: `**Modifié l'image 
            de l'embed.**`, inline: true },
            { name: '`8️⃣`', value: `**Modifié le lien 
            de l'embed.**`, inline: true },
            { name: '`9️⃣`', value: `**Modifié la couleur 
            de l'embed.**`, inline: true },
            { name: '`✅`', value: `**Validé la construction
            de l'embed.**`, inline: true },
            { name: '`❌`', value: `**Annulé la construction 
            de l'embed.**`, inline: true },
        )
        .setColor(0x36393E)
        .setAuthor("hlou irv#7072")
        let msgembed = await message.channel.send(embed)
        
        await msgembed.react('1️⃣')
        await fast(250);
        await msgembed.react('2️⃣')
        await fast(250);
        await msgembed.react('3️⃣')
        await fast(250);
        await msgembed.react('4️⃣')
        await fast(250);
        await msgembed.react('5️⃣')
        await fast(250);
        await msgembed.react('6️⃣')
        await fast(250);
        await msgembed.react('7️⃣')
        await fast(250);
        await msgembed.react('8️⃣')
        await fast(250);
        await msgembed.react('9️⃣')
        await fast(250);
        await msgembed.react('✅')
            function fast(ms) {
                        return new Promise((resolve) => {
                          setTimeout(resolve, ms);
                        });
                      }
        await msgembed.react('❌').then(async (m) => {

        
            let collector = msgembed.createReactionCollector((reaction, user) => user.id === message.author.id);
            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "1️⃣") {
                    let question = await message.channel.send("Quel est le `Titre` de votre Embed ?",)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        updateEmbed()
                        function updateEmbed() {
                    embed.setTitle(collected.first().content)
                    msgembed.edit(embed)
                }
            })
        }
                
                if (reaction._emoji.name === "2️⃣") {
                    let question = await message.channel.send("Quel est la `Description` de votre Embed ?",)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        updateEmbed()
                        function updateEmbed() {
                    embed.setDescription(collected.first().content)
                    msgembed.edit(embed)
                }
            })
        }
                if (reaction._emoji.name === "3️⃣") {
                    let question = await message.channel.send("Quel est `L'auteur` de votre Embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    let question2 = await message.channel.send("Quel est `L'image d'Auteur` de votre Embed ?")
    
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected2) => {
                        collected2.first().delete()
                        question2.delete()
                        .then(async () => {
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.channel.send("Erreur votre `Image d'Auteur` est invalide `( Fournir un lien Valide )`").then((mm) => mm.delete({
                                timeout: 5000
                            }));
                        })
                    updateEmbed()
                    function updateEmbed() {
                embed.setAuthor(collected.first().content, collected2.first().content)
                msgembed.edit(embed)
            }
            });
        })
    }
            if (reaction._emoji.name === "4️⃣") {
                let question = await message.channel.send("Quel est le `Footer` de votre Embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    let question2 = await message.channel.send("Quel est `L'image Footer` de votre Embed ?")
    
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected2) => {
                        collected2.first().delete()
                        question2.delete()
                        .then(async () => {
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.channel.send("Erreur votre `Image d'Auteur` est invalide `( Fournir un lien Valide )`").then((mm) => mm.delete({
                                timeout: 5000
                            }));
                        })
                    updateEmbed()
                    function updateEmbed() {
                embed.setFooter(collected.first().content, collected2.first().content)
                msgembed.edit(embed)
            }
        });
    })
}
            if (reaction._emoji.name === "5️⃣") {
                let question = await message.channel.send("Quel est le `Thumbnail` de votre Embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Erreur `Thumbnail` le lien est Invalide ?").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    updateEmbed()
                    function updateEmbed() {
                embed.setThumbnail(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "6️⃣") {
                let question = await message.channel.send("Quel est `L'image` de votre Embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Erreur `L'image` est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    updateEmbed()
                    function updateEmbed() {
                embed.setImage(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "7️⃣") {
                let question = await message.channel.send("Quel est `L'url` de votre Embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Erreur `URL`, l'URL est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    updateEmbed()
                    function updateEmbed() {
                embed.setURL(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "8️⃣") {
                let question = await message.channel.send("Quel Couleur voulez vous pour votre Embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Erreur `Couleur` est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    updateEmbed()
                    function updateEmbed() {
                embed.setColor(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "9️⃣") {
                let question = await message.channel.send("Quel `Timestamp` voulez-vous attribuez à l'embed ? Veuillez marquer `oui` si vous voulez qu'un timestamp de l'heure actuelle soit ajouté. Tapez `cancel` pour annuler.",)
                
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    if(collected.first() === 'cancel') return;
                    if(collected.first() === 'today') return updateEmbed()
                    function updateEmbed() {
                embed.setTimestamp()
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "✅") {
                let question = await message.channel.send("Veuillez `Mentionné` le salon la ou vous voulez que votre Embed s'envoie.",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    const embedchannel = message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
                    if (!embedchannel) return message.channel.send('Veuillez donnez un salon textuel valide.')
                    embedchannel.send(embed)
            })
        }
    
    
        
                if (reaction._emoji.name === "❌") {
                    msg.delete()
                }
                await reaction.users.remove(message.author.id);
            })
        })
    }
})


client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})

client.on('webhookUpdate', async (channel ) => {
    const guild = channel.guild;        
    const action = await guild.fetchAuditLogs({ type: "WEBHOOK_CREATE"     }).then(async (audit) => audit.entries.first());
        if (action.executor.id === client.user.id) return;
          const position = channel.position;
          const webhook = await channel.fetchWebhooks();
          const rateLimitPerUser = channel.rateLimitPerUser;
          var newChannel = await channel.clone()
         channel.delete();
        var loggingEmbed = new Discord.MessageEmbed()
    .setTitle('Fz & Irvv')
    .addField(`ID : ${action.executor.tag}`, `**Utilisateur :** ${action.executor}`)
    .setColor(0x36393E)
    .setFooter("Attention, un webhook vient d'être crée.")
    newChannel.setPosition(position);
    newChannel.setRateLimitPerUser(rateLimitPerUser)
    let logChannel = client.channels.cache.get("871182636066959451")
if(!logChannel) return;
logChannel.send(loggingEmbed)
})



client.login(token);

