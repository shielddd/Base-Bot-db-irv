const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "delrole",

    async run(client, message, args) {
    
    let target = message.mentions.members.first();
    
    if(!target) return message.channel.send("`-delrole @mention [role/id]`")
    
    let rrole = message.mentions.roles.first();
    
    if(!rrole) return message.channel.send("`-delrole @mention [role/id]`")
    
      const embed = new MessageEmbed()
      .setColor(0x36393E)
      .setDescription(`${rrole} Retiré par: ${target}`)
      
      await message.channel.send(embed)
      
      target.roles.remove(rrole)
    
  }
}