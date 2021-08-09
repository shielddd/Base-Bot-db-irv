const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "unblall",
    description: "help command",

    async run(client, message, args) {
        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('Fichier: ' + path + ' Existe Pas.'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Erreur : Impossible de récupérer les données | Astuce : utilisez \`${prefix}cata\`créer une base de données`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${guildID}.json`)

        

                if (message.author.id === Owner ) {
                    async function UnwhitelistAll() {
                        const BLISTEDIDS = Info.Data.BlackListedUserIDs;
                        const BLISTEDUSERS = Info.Data.BlackListedUsers;

                        if (BLISTEDIDS.length === 0) {

                            const nothing = new Discord.MessageEmbed()
                                .setDescription(`Les données de la BL sont actuellement vides.`)
                                .setColor(0x36393E)
                            message.channel.send(nothing)

                        } else {

                            BLISTEDIDS.length = 0;
                            BLISTEDUSERS.length = 0;

                            const content = JSON.stringify(Info, null, 2);

                            fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                            console.log(yellowBright('\nUnBlackList tout les users de ce bot \nSave ✅'))
                            const Successful = new Discord.MessageEmbed()   
                                .setDescription(`Liste de la BlackList supprimé avec succès!`)
                                .setColor(0x36393E)
                            message.channel.send(Successful).then((msg) => msg.react('✅'))

                        }

                    }
                    UnwhitelistAll()
                }
            }
        })
    }
}