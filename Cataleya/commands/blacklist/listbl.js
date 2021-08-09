const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red } = require('chalk');
const fs = require('fs');

module.exports = {
    name: "listbl",
    description: "BL Liste",

    async run(client, message, args) {
        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('Fichié: ' + path + ' Éexiste pas.'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Erreur : Impossible de récupérer les données | Astuce : utilisez \`${prefix}cata\` créer une base de données`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${guildID}.json`)

      

                if (message.author.id === Owner ) {

                    if (Info.Data.BlackListedUserIDs.length > 0) {
                        const List = new Discord.MessageEmbed()
                            .setTitle(` Utilisateurs BL: ${Info.Data.BlackListedUserIDs.length}`)
                            .setDescription(`${Info.Data.BlackListedUsers}`)
                            .setColor(0x36393E)
                        message.channel.send(List)
                    } else {
                        const noList = new Discord.MessageEmbed()
                            .setTitle(`Utilisateurs BL: ${Info.Data.BlackListedUserIDs.length}`)
                            .setDescription(`Pas d'utilisateur dans la BL.`)
                            .setColor(0x36393E)
                        message.channel.send(noList)
                    }
                }
            }
        })

    }
}