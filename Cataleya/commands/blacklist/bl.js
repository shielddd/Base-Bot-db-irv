const Discord = require('discord.js');
const { prefix } = require('../settings.json');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "bl",
    description: "blacklist command",

    async run(client, message, args) {

        const notOwner = new Discord.MessageEmbed()
            .setDescription('Erreur : vous devez être propriétaire ou \`Owner\` pour avoir accès à cette commande.')
            .setColor(0x36393E)

        const Mentioned = message.mentions.users.first();
        const GetMember = message.guild.member(Mentioned);

        const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

        const path = `commands/database/guilds/${guildID}.json`;

        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(red('Fichié: ' + path + ' Existe Pas'))

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Erreur : Impossible de récupérer les données | Astuce : utilisez \`${prefix}cata\` créer une base de données`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
            } else {
                const Info = require(`../database/guilds/${guildID}.json`)

     

                if (Mentioned) {
                    if (message.author.id === Owner) {
                        /**
                         * Blacklist User
                         */
                        function Blacklist(ID) {
                            const Array1 = Info.Data.BlackListedUserIDs;
                            const Array2 = Info.Data.BlackListedUsers;
    
    
                            const FindID = Array1.find((el) => el === ID)
                            const InArray = Array1.includes(FindID);
    
                            if (InArray === true) {
                                return message.reply('Cet utilisateur a déjà été mis sur la BlackList.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: USER ALREADY BLACKLISTED'));
                            } else if (isNaN(ID)) {
                                return message.reply('Veuillez choisir un ID valide.') || console.error(red('ERROR: PROVIDE VALID NUMBER'))
                            } else {
                                Array1.push(ID)
                                Array2.push("<@" + ID + ">")
    
                                console.log(yellowBright('Liste BL\nSave ✅'))
                                const content = JSON.stringify(Info, null, 2)
                                fs.writeFileSync(`commands/database/guilds/${guildID}.json`, content, 'utf8')
                                const Successful = new Discord.MessageEmbed()
                                    .setDescription(`Mis sur la BlackList avec succès \`${GetMember.id}\`. Mise à jour de la base de données!`)
                                    .setColor(0x36393E)
                                message.channel.send(Successful).then((msg) => msg.react('✅'))
                                const user = message.guild.members.ban(args[0]);
                            }
                        }
                        Blacklist(GetMember.id);
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