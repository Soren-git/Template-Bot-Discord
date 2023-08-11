const LoadSlashCommands = require("../Handlers/Loaders/LoadSlashCommands.js"); // Importer la fonction pour charger les commandes slash

module.exports = async (Bot) => {
  await LoadSlashCommands(Bot); // Charger les commandes slash en utilisant la fonction importée
};
