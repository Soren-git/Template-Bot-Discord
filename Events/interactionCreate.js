const Discord = require('discord.js'); // Bibliothèque Discord.js pour créer des bots Discord

module.exports = async (Bot, interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let Command = require(`../Commands/Slash Commands/${interaction.commandName}.js`); // Importer le module de la commande slash
        Command.run(Bot, interaction, Args); // Exécuter la fonction run de la commande slash
    }
};
