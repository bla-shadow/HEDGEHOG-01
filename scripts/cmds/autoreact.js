module.exports = {
  config: {
    name: "autoreact",
    version: "1.4",
    author: "Axier",
    cooldown: 5,
    role: 0,
    shortDescription: "🤖 Réagit automatiquement avec des emojis et réponses",
    longDescription: "Réagit aux mots-clés par des emojis ou messages automatiques.",
    category: "fun",
    guide: "Cette commande fonctionne automatiquement via onChat.",
  },

  onStart: async () => {
    // Rien ici, la commande s’active toute seule via onChat
  },

  onChat: async ({ api, event }) => {
    const { body, messageID, threadID } = event;
    if (!body) return;

    const emojis = {
"😀": ["😀"],
"😃": ["😃"],
"😄": ["😄"],
"😁": ["😁"],
"😆": ["😆"],
"😅": ["😅"],
"😂": ["😂"],
"🤣": ["🤣"],
"😭": ["😭"],
"😉": ["😉"],
"😗": ["😗"],
"😙": ["😙"],
"😚": ["😚"],
"😘": ["😘"],
"🥰": ["🥰"],
"😍": ["😍"],
"🤩": ["🤩"],
"🥳": ["🥳"],
"🙃": ["🙃"],
"🙂": ["🙂"],
"🥲": ["🥲"],
"😋": ["😋"],
"😛": ["😛"],
"😝": ["😝"],
"😜": ["😜"],
"🤪": ["🤪"],
"😇": ["😇"],
"😊": ["😊"],
"☺️": ["☺️"],
"😏": ["😏"],
"😌": ["😌"],
"😔": ["😔"],
"😑": ["😑"],
"😐": ["😐"],
"😶": ["😶"],
"🤔": ["🤔"],
"🤫": ["🤫"],
"🤭": ["🤭"],
"🥱": ["🥱"],
"🤗": ["🤗"],
"😱": ["😱"],
"🤨": ["🤨"],
"🧐": ["🧐"],
"😒": ["😒"],
"🙄": ["🙄"],
"😤": ["😤"],
"😠": ["😠"],
"😡": ["😡"],
"🤬": ["🤬"],
    };

    const replies = {
      "🌷🌷🌷": "~~𝙾𝚞𝚒 ?? 🙃🌷"
    };

    // Réactions
    for (const [emoji, words] of Object.entries(emojis)) {
      for (const word of words) {
        if (body.toLowerCase().includes(word)) {
          return api.setMessageReaction(emoji, messageID, () => {}, true);
        }
      }
    }

    // Réponses
    for (const [trigger, reply] of Object.entries(replies)) {
      if (body.toLowerCase().includes(trigger)) {
        return api.sendMessage(reply, threadID, messageID);
      }
    }
  }
};
