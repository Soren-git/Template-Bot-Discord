module.exports = async (Bot, message) => {
  let Config = require("../Databases/Bot/Config.json"); // Importer le fichier de configuration
  let Prefix = Config.Bot.System.Prefix; // Obtenir le préfixe de commande régulier depuis la configuration
  let PrefixAdmin = Config.Bot.System.PrefixAdmin; // Obtenir le préfixe de commande admin depuis la configuration
  let Prefixes = [Prefix, PrefixAdmin]; // Créer un tableau de préfixes à vérifier

  // Vérifier si le message ne commence pas par l'un des préfixes ou si l'auteur est un bot
  if (!Prefixes.some(Prefix => message.content.startsWith(Prefix)) || message.author.bot) return;

  if (message.content.startsWith(Prefix)) {
    let MessageArray = message.content.split(" "); // Diviser le message en un tableau de chaînes de caractères
    let Args = MessageArray.slice(1); // Extraire les arguments du tableau
    let CommandName = MessageArray[0].slice((Prefix).length); // Obtenir le nom de la commande à partir du message
    let Command;
    try {
      Command = require(`../Commands/Simple Commands/${CommandName}.js`); // Importer le module de commande
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        message.reply("Cette commande n'existe pas !");
        console.log(err);
        return;
      }
    }
    Command.run(Bot, message, Args); // Exécuter la fonction run de la commande
  } else if (message.content.startsWith(PrefixAdmin)) {
    let MessageArray = message.content.split(" "); // Diviser le message en un tableau de chaînes de caractères
    let Args = MessageArray.slice(1); // Extraire les arguments du tableau
    let CommandName = MessageArray[0].slice((PrefixAdmin).length); // Obtenir le nom de la commande admin à partir du message
    let AdminCommand;
    try {
      AdminCommand = require(`../Commands/Admin Commands/${CommandName}.js`); // Importer le module de commande admin
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        message.reply("Cette commande n'existe pas !");
        console.log(err);
        return;
      }
    }
    AdminCommand.run(Bot, message, Args); // Exécuter la fonction run de la commande admin
  }
};
