const Discord = require('discord.js');
const { prefix, DEV_TEAM, founderId } = require('../settings.json');
const pagination = require("discord.js-pagination");
const { red } = require("chalk");

module.exports = {
    name: "help",
    description: "help commwand",

    async run(client, message, args) {

        const DevsID = DEV_TEAM.find((userData) => userData === `${message.author.id}`)

        if (message.author.id === DevsID || founderId) {
            const page0 = new Discord.MessageEmbed()
            .setTitle(`=> Construire Irv BOT`)
            .setDescription(`\n\n **Construire DataBase** | \`${prefix}cata\` \n **Re-Load** | \`${prefix}recata\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
    
            const page1 = new Discord.MessageEmbed()
                .setTitle(`=> Système WhiteList`)
                .setDescription(`\n**Système WhiteList Irv\n\n **=> ** | \`${prefix}wl [ID]\` \n **=>** | \`${prefix}unwl [ID]\`\n **=>** | \`${prefix}unwlall\`\n =>** | \`${prefix}listwl\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());
    
            const page2 = new Discord.MessageEmbed()
                .setTitle(`=> Système BlackList`)    
                .setDescription(`\n*Système BlackList Irv*\n\n**=>** | \`${prefix}bl [ID]\` \n**=>** | \`${prefix}unbl [ID]\` \n**=>** | \`${prefix}ublall\` \n**=>** | \`${prefix}listbl\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());

            const page3 = new Discord.MessageEmbed()
                .setTitle(`=> Owner`)    
                .setDescription(`\n*Système Owner Irv*\n\n**=>** | \`${prefix}lock\`\n**=>** | \`${prefix}unlock\`\n**=>** | \`${prefix}addrole [@mention] [@ID/Role]\`\n**=>** | \`${prefix}delrole [@mention] [@ID/Role]\`\n**=>** | \`${prefix}embed\`\n**=>** | \`${prefix}vc\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());

            const page4 = new Discord.MessageEmbed()
                .setTitle(`=> Modération`)    
                .setDescription(`\n*Système Modération irv*\n\n**=>** | \`${prefix}mute [@mention]\` \n**=>** | \`${prefix}tempmute [@mention] [temps (5m)]\`\n**=>** | \`${prefix}unmute [@mention]\` \n**=>** | \`${prefix}clear [1 à 100]\`\n**=>** | \`${prefix}ban [@mention] [raison]\`\n**=>** | \`${prefix}unban [@mention]\`\n**=>** | \`${prefix}unbanall\`\n**=>** | \`${prefix}role [@ID-Role]\`\n**=>** | \`${prefix}nuke\`\n**=>** | \`${prefix}warn [@mention] [raison]\``)
                .setColor(0x36393E)
                .setTimestamp(Date.now());

            const page5 = new Discord.MessageEmbed()
            .setTitle(`=> Infos`)
            .setDescription(`\n*Système Information irv*\n\n**=>** | \`${prefix}serv\`\n**=>** | \`${prefix}userinfo\`\n**=>** | \`${prefix}servinfo\`\n**=>** | \`${prefix}userinfo\`\n**=>** | \`${prefix}snipe\`\n**=>** | \`${prefix}userinfo\`\n**=>** | \`${prefix}pp [@mention]\``)
            .setColor(0x36393E)
            .setTimestamp(Date.now());
            
    
    
            const pages = [ page0, page1, page2, page3, page4, page5 ]
    
            const emojis = ["➖", "➕"];
    
            const timeout = '100000';
    
            pagination(message, pages, emojis, timeout).catch((err) => {
                console.error(red(`[COMMAND FAILED] : [GUILD] ${message.guild.name} | [CHANNEL] ${message.channel.name} | [REASON] MISSING PERMISSIONS | ${err}`));
            });
        }

    }
}