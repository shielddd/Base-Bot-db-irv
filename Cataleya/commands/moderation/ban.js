const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "commande ban",

    async run(client, message, args) {
        const user2 = message.mentions.users.first();
        if (user2) {
            const member = message.guild.member(user2);
            const banembed = new Discord.MessageEmbed()
                .setDescription("*Vous n'êtes pas autorisé à utiliser cette commande*")
                .setColor(0x36393E)
                .setTimestamp(Date.now());

            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(banembed)

            const highroleembed = new Discord.MessageEmbed()
                .setDescription("*Vous n'êtes pas autorisé à utiliser cette commande*")
                .setColor(0x36393E)
                .setTimestamp(Date.now());
            if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(highroleembed);
            if (member) {

                member
                    .ban({ days: 7, reason: "Bad." })
                    .then(() => {
                        const bannedembed = new Discord.MessageEmbed()
                            .setDescription(`***Utilisateur Ban: ${user2.tag}***`)
                            .setColor(0x36393E)
                            .setTimestamp(Date.now());
                        message.channel.send(bannedembed)
                    })
                    .catch(err => {

                        message.reply('Pas possible de ban le membre.');
                        console.error(err);
                    });
            } else {
                const nomemembed = new Discord.MessageEmbed()
                    .setDescription("*Cet utilisateur n'est pas sur le serveur.*")
                    .setColor(0x36393E)
                    .setTimestamp(Date.now());
                message.channel.send(nomemembed)
            }
        } else {
            const nobanmentionembed = new Discord.MessageEmbed()
                .setDescription("*Vous n'avez pas mentionner l'utilisateur.*")
                .setColor(0x36393E)
                .setTimestamp(Date.now());
            message.channel.send(nobanmentionembed)
        }
    }
}