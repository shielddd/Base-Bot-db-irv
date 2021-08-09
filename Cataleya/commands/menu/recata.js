const Discord = require('discord.js');
const { red, cyanBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "recata",
    description: "reset database",

    async run(client, message, args) {
        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;
        const path = `commands/database/guilds/${guildID}.json`;
        const path2 = `commands/database/backup_guilds/${guildID}.json`;
        function ResetData() {
            try {
                fs.unlinkSync(path)
                if (fs.existsSync(path2)) { 
                    fs.unlinkSync(path2)

                    console.log(cyanBright('Retiré Fichié(s): ' + path + '\n2: ' + path2 + '\n'))
                    const success = new Discord.MessageEmbed()
                    .setDescription(`Retiration de la DataBase de tout les serveurs ou je suis avec succès.`)
                    .setColor(0x36393E)
                return message.channel.send(success)
                } else {
                    console.log(cyanBright('Fichié retiré avec succès: ' + path))
                    const succ = new Discord.MessageEmbed()
                    .setDescription(`**Data-Base retiré.**`)
                    .setColor(0x36393E)
                return message.channel.send(succ)
                }

            } catch (err) {
                console.error(red('Impossible Fichié ' + path))
                const erro2 = new Discord.MessageEmbed()
                .setDescription(`Fichier pas retrouvé`)
                .setColor(0x36393E)
            return message.channel.send(erro2)
            }
        }

        fs.access(path, fs.F_OK, (err) => {
            if (err) {

                console.error(red('Fichié: ' + path + ' Existe pas.'))

                const error = new Discord.MessageEmbed()
                    .setDescription(`Le serveurs n'a pas de Data-Base.`)
                    .setColor(0x36393E)
                message.channel.send(error)

            } else {
                if (message.author.id === Owner) {



                    const respond = new Discord.MessageEmbed()
                        .setDescription(`\`oui\` | \`non\`\n\n`)
                        .setColor(0x36393E)

                    const filter = m => m.author.id == Owner;
                    message.channel.send(respond).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                            .then(collected => {
                                message = collected.first()
                                if (message.content.toUpperCase() == 'OUI' || message.content.toUpperCase() == 'O') {
                                    ResetData();
                                } else if (message.content.toUpperCase() == 'NON' || message.content.toUpperCase() == 'N') {
                                    const cancelled = new Discord.MessageEmbed()
                                        .setDescription(`Le Reset de la Data-Base est annulé.`)
                                        .setColor(0x36393E)
                                    return message.channel.send(cancelled)
                                }
                            }).catch(() => {
                                console.log(red('**Commande expiré**'));
                                const cancelled = new Discord.MessageEmbed()
                                    .setDescription(`Reset Annulé.`)
                                    .setColor(0x36393E)
                                message.channel.send(cancelled)
                            });
                    })

                } else {
                    const Unauthorised = new Discord.MessageEmbed()
                        .setDescription(`Pas autorisé à éfectué cette commande veuillez demander à un Owner de ce bot.`)
                        .setColor(0x36393E)
                    message.channel.send(Unauthorised)
                }


            }

        })

    }

}