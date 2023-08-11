module.exports = {
  name: "ping", // Le nom de la commande slash
  description: 'test', // La description de la commande slash
  dm: true, // True = Activé ou False = Désactivé
  options: [
    {
      type: "<TYPE_DE_L'OPTION>", // Ajoutez ici le type de l'option que vous pouvez retrouver dans la documentation de DiscordJS
      name: "<NOM_DE_L'OPTION>", // Ajoutez ici le nom de l'option
      description: "<DESCRIPTION_DE_L'OPTION>", // Ajoutez ici la description de l'option
      required: true, // True = Activé ou False = Désactivé
      autocomplete: true, // True = Activé ou False = Désactivé
    },
  ],

  async run(Bot, interaction, Args) {
      interaction.reply({ content: "Pong!", ephemeral: true }); // Répondre à l'interaction avec "Pong!" et définir ephemeral sur true (visible uniquement par l'utilisateur qui a invoqué la commande)
  },
};


// Ce fichier représente comment le code des commandes slash devrait être organisé. Cette commande n'est donc pas à prendre en compte et peut être supprimée sans avoir d'impact sur le bot.
