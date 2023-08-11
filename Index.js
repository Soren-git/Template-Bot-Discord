// Importer les modules nécessaires
const Discord = require("discord.js"); // Bibliothèque Discord.js pour créer des bots Discord
const Bot = new Discord.Client({ intents: 3276799 }); // Créer un nouveau client bot Discord
const Colors = require("colors"); // Bibliothèque Colors pour ajouter des couleurs aux journaux de la console
const Config = require("./Databases/Bot/Config.json"); // Fichier de configuration pour les paramètres du bot
const LoadCommands = require("./Handlers/Loaders/LoadCommands.js"); // Fonction pour charger les commandes du bot
const LoadEvents = require("./Handlers/Loaders/LoadEvents.js"); // Fonction pour charger les événements du bot
const LoadAdminCommands = require("./Handlers/Loaders/LoadAdminCommands.js"); // Fonction pour charger les commandes administratives du bot

// Créer des collections de commandes pour le bot
Bot.Commands = new Discord.Collection(); // Commandes régulières du bot
Bot.SlashCommands = new Discord.Collection(); // Commandes slash
Bot.AdminCommands = new Discord.Collection(); // Commandes d'administration

// Se connecter au bot en utilisant le jeton du fichier de configuration
Bot.login(Config.Bot.System.Token)
  .then(async () => {
    console.clear();
    console.log(
      "[Bot]".bold.blue + " Connecté en tant que " + Bot.user.tag.bold.green
    );
    // Charger les commandes, les événements et les commandes d'administration du bot
    LoadCommands(Bot);
    LoadEvents(Bot);
    LoadAdminCommands(Bot);
  })
  .catch(async (err) => {
    console.clear();
    console.log("[Bot]".bold.blue + " Erreur : " + String(err).bold.red);
  });
