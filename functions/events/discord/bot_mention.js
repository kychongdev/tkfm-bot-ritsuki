// authenticates you with the API standard library
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

// if(context.params.event.channel_id !== "986410134894940240"){
  // throw "You cannot perform command in this channel"
// }

const conv = [
  "凜月在執行千鶴公主交代的秘密任務，暫時無法回應主上您",
  "千鶴公主邀請我去茶會，請容我先失陪了",
  "請恕我失禮了，主上並未贈與我與蘿莉控聊天的權限",
  "忍者本就應在暗處潛伏，請大人您不要隨意呼叫在下",
  "侍寢嗎？請你速戰速決，千鶴公主還在等我呢。"
];

const chosenMessage = conv[Math.floor(Math.random() * conv.length)];

await lib.discord.channels["@0.3.0"].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `<@!${context.params.event.author.id}> ${chosenMessage}`,
  tts: false,
});

