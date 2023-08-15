const fs = require("fs"); // Module de système de fichiers pour la lecture des fichiers
const Colors = require("colors"); // Bibliothèque Colors pour ajouter des couleurs aux journaux de la console

module.exports = async (Bot) => {
  // Lire les fichiers dans le répertoire "Simple Commands"
  fs.readdirSync("./Commands/Simple Commands")
    .filter((f) => f.endsWith(".js"))
    .forEach((file) => {
      let Command = require(`../../Commands/Simple Commands/${file}`);
      // Vérifier si la commande a un nom valide
      if (!Command.name || typeof Command.name !== "string")
        throw new TypeError(
          "[COMMANDES(SIMPLE)]".bold.pink +
            " La commande " +
            `${file.slice(0, file.length - 3)}.js`.bold.pink +
            " n'a pas de nom."
        );
      Bot.Commands.set(Command.name, Command);
      console.log(
        "[COMMANDES(SIMPLE)]".bold.yellow +
          " La commande " +
          `${file}`.bold.green +
          " a été chargée avec succès."
      );
    });
    await console.log(
      "[COMMANDES(SIMPLE)]".bold.yellow +
        " Les Simples Commandes ont été chargées avec succès."
    );
};
