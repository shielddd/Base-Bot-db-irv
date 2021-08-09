const { MessageEmbed } = require("discord.js");
const { ownerID } = require(".././settings.json")
module.exports = {
    name: "addrole",

  run: async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"]) && !founderID.includes(message.author.id)) return message.channel.send("Tu n'as pas la permission de utilisé cette commande.")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Veuillez fournir un utilisateur à ajouté le role à.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Veuillez fournir un membre ainsi qu'un role à lui ajouté.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Je n'est pas la permission de effectué cette commande!")

    if(rMember.roles.cache.has(role.id)) {
        
      return message.channel.send(`${rMember.displayName}, à déjà le role!`)
    
    } else {
        
      await rMember.roles.add(role.id).catch(e => console.log(e.message))
      
      message.channel.send(`${rMember.displayName} à été ajouté à **${role.name}**`)
    
    }

  },
};