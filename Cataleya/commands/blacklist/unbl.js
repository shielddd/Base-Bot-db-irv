const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "unbl",
    description: "unblacklist command",

    async run(client, message, args) {
       
        const notOwner = new Discord.MessageEmbed()
            .setDescription('Erreur : Vous devez être propriétaire ou \`WL\` pour pouvoir accéder à cette commande.')
            .setColor(0x36393E)

        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('Fichié: ' + path + ' Existe Pas.'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Erreur : Impossible de récupérer les données | Astuce : utilisez\`${prefix}cata\` to create a database`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${guildID}.json`)

         

                if (Mentioned) {
                    if (message.author.id === Owner) {
                        /**
                         * Unblacklist User
                         */
                        function UnBlacklist(ID) {
                            const Array = Info.Data.BlackListedUserIDs;
                            const FindID = Array.find((el) => el === ID);
                            const InArray = Array.includes(FindID);
                            const ElIndex = Array.indexOf(FindID);
                            Array.splice(ElIndex, 1)

                            const Array2 = Info.Data.BlackListedUsers;
                            const FindID2 = Array.find((el) => el === `<@${ID}>`);
                            const ElIndex2 = Array.indexOf(FindID2);
                            Array2.splice(ElIndex2, 1)

                            const content = JSON.stringify(Info, null, 2)

                            if (isNaN(ID)) {
                                return message.reply('Fournissez une pièce ID valide.') || console.error(red('ERREUR : FOURNIR UN NUMÉRO VALIDE'))
                            }

                            if (InArray === false) {
                                console.log('\nPas dans la BL ❌\n')
                                const notinDb = new Discord.MessageEmbed()
                                    .setDescription('Erreur : ID absent de la base de données de la BL.')
                                    .setColor(0x36393E)
                                return message.channel.send(notinDb)
                            } else {
                                fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8');
                                console.log(yellowBright('Débloquer la BL avec succès\nSave ✅'))
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Débloqué avec succès \`${GetMember.id}\`. Mise à jour de la base de données!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                            }

                        }
                        UnBlacklist(GetMember.id);
                    } else {
                        message.channel.send(notOwner)
                    }
                } else {
                    const noID = new Discord.MessageEmbed()
                    .setDescription('Erreur : Utilisateur non mentionné')
                    .setColor(0x36393E)
                return message.channel.send(noID) && console.log(red('Utilisateur non mentionné'))
                }
            }
        })
    }
}