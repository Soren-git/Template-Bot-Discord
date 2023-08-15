const Discord = require("discord.js"); // Bibliothèque Discord.js pour créer des bots Discord
const { REST } = require("@discordjs/rest"); // Bibliothèque Discord.js pour interagir avec l'API REST
const { Routes } = require("discord.js"); // Bibliothèque Discord.js pour les routes de l'API
const fs = require("fs"); // Module de système de fichiers pour la lecture des fichiers

module.exports = async (Bot) => {
  // Lire les fichiers dans le répertoire "Slash Commands"
  fs.readdirSync("./Commands/Slash Commands")
    .filter((f) => f.endsWith(".js"))
    .forEach((file) => {
      let Command = require(`../../Commands/Slash Commands/${file}`);
      // Vérifier si la commande a un nom valide
      if (!Command.name || typeof Command.name !== "string")
        throw new TypeError(
          "[COMMANDES(SLASH)]".bold.red +
            " La commande " +
            `${file.slice(0, file.length - 3)}.js`.bold.red +
            " n'a pas de nom."
        );
      Bot.SlashCommands.set(Command.name, Command);
      Bot.AllCommands.set(Command.name, Command);
      console.log(
        "[COMMANDES(SLASH)]".bold.red +
          " La commande " +
          `${file}`.bold.green +
          " SlashCommand a été chargée avec succès."
      );
    });

  let Commands = [];
  Bot.SlashCommands.forEach(async (command) => {
    let SlashCommand = new Discord.SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)
      .setDMPermission(command.dm)
      .setDefaultMemberPermissions(
        command.permission === "Aucune" ? null : command.permission
      );

    if (command.options?.length >= 1) {
      // Parcourir les options de la commande
      for (let i = 0; i < command.options.length; i++) {
        // Ajouter dynamiquement des options en fonction de leur type
        SlashCommand[
          `add${
            command.options[i].type.slice(0, 1).toUpperCase() +
            command.options[i].type.slice(1, command.options[i].type.length)
          }Option`
        ](async (option) =>
          option
            .setName(command.options[i].name)
            .setDescription(command.options[i].description)
            .setRequired(command.options[i].required)
        );
      }
    }
    await Commands.push(SlashCommand);
  });

  const Rest = new REST({ version: 10 }).setToken(Bot.token);

  // Enregistrer les commandes slash avec l'API Discord
  await Rest.put(Routes.applicationCommands(Bot.user.id), {
    body: Commands,
  });

  await console.log(
    "[COMMANDES(SLASH)]".bold.red +
      " Les SlashCommands ont été chargées avec succès."
  );
};
