const fs = require("fs"); // Module de système de fichiers pour la lecture des fichiers

module.exports = async (Bot) => {
  // Lire les fichiers dans le répertoire "Events"
  fs.readdirSync("./Events")
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      let Event = require(`../../Events/${file}`);
      // Lier la fonction de l'événement au client du bot
      Bot.on(file.split(".js").join(""), Event.bind(null, Bot));
      console.log(
        "[Événements]".bold.magenta +
          ` L'événement ${file.bold.green} a été chargé avec succès.`
      );
    });
};
