const fs = require("fs"); // Module de système de fichiers pour la lecture des fichiers
const Colors = require("colors"); // Bibliothèque Colors pour ajouter des couleurs aux journaux de la console

module.exports = async (Bot) => {
  // Lire les fichiers dans le répertoire "Admin Commands"
  fs.readdirSync("./Commands/Admin Commands")
    .filter((f) => f.endsWith(".js"))
    .forEach((file) => {
      let Command = require(`../../Commands/Admin Commands/${file}`);
      // Vérifier si la commande a un nom valide
      if (!Command.name || typeof Command.name !== "string")
        throw new TypeError(
          "[COMMANDES(ADMIN)]".bold.white +
            " La commande " +
            `${file.slice(0, file.length - 3)}.js`.bold.white +
            " n'a pas de nom."
        );
      Bot.AdminCommands.set(Command.name, Command);
      console.log(
        "[COMMANDES(ADMIN)]".bold.white +
          " La commande administrative " +
          `${file}`.bold.green +
          " a été chargée avec succès."
      );
    });
};
