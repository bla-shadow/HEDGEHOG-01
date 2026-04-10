const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "jail",
    aliases: ["prison"],
    version: "1.0",
    author: "Xavier",
    countDown: 5,
    role: 0,
    description: "Met quelqu’un en prison 😆",
    category: "fun",
    guide: {
      en: "{pn} @tag ou répondre à un message"
    }
  },

  langs: {
    en: {
      noTarget: "⚠️ Vous devez taguer quelqu’un ou répondre à son message."
    }
  },

  onStart: async function ({ event, message, usersData, getLang }) {
    try {
      let targetID;

      if (Object.keys(event.mentions).length > 0) {
        targetID = Object.keys(event.mentions)[0];
      } else if (event.messageReply) {
        targetID = event.messageReply.senderID;
      }

      if (!targetID) return message.reply(getLang("noTarget"));

      const userInfo = await usersData.getName(targetID);
      const avatarURL = await usersData.getAvatarUrl(targetID);

      const apiBaseRes = await axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/ApiUrl.json");
      const apiBase = apiBaseRes.data?.apiv1;
      if (!apiBase) return message.reply("❌ URL de base de l'API introuvable dans ApiUrl.json.");

      const apiURL = `${apiBase}/api/jail?url=${encodeURIComponent(avatarURL)}`;
      const imgPath = path.join(__dirname, "tmp", `${targetID}_jail.png`);

      const response = await axios.get(apiURL, { responseType: "arraybuffer" });
      await fs.outputFile(imgPath, response.data);

      await message.reply({
        body: `🚔 ${userInfo} est maintenant derrière les barreaux !`,
        attachment: fs.createReadStream(imgPath)
      });

      fs.unlinkSync(imgPath);
    } catch (err) {
      console.error(err);
      message.reply("❌ Échec de la génération de l'image de prison. Veuillez réessayer plus tard.");
    }
  }
};
