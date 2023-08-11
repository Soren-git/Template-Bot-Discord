module.exports = {
  name: "ping", // Le nom de la commande
  description: "test", // La description de la commande

  async run(Bot, message, Args) {
    message.reply("Pong!"); // Répondre au message avec "Pong!"
  },
};

// Ce fichier représente comment le code des commandes administratives devrait être organisé. Cette commande n'est donc pas à prendre en compte et peut être supprimée sans avoir d'impact sur le bot.
