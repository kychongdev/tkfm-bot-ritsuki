const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

if(context.params.event.channel_id !== "986603537788186644" ){
  throw "You cannot perform command in this channel"
}

const conv = [
  "「凜月在此，凱薩大人今天是要侍寢嗎？這次是要吊繩、跳蛋、震動按摩棒、媚藥、低溫蠟燭、皮鞭…還是野外、綑綁、盲眼、公廁、密室調教…」",
  "\n「如果是上次48小時忍住不高潮還請…不是要做這些？真的非常抱歉，以為已經是凱薩大人對在下的日常待遇…」",
  "\n「要在下潛入天下布魔的抽卡池，幫凱薩大人偷看抽卡結果？」「恕在下直言，這樣的行為有辱魔王的尊嚴」",
  "\n「凱薩大人一直都是正面對決，勇往直前，行房時也是如此…什麼！？如果不去就要找千鶴公主一起玩特別的PLAY？」",
  "\n「嗚…為了千鶴，在下必會完成任務的。那些PLAY，就請…對在下任意使用就好。」",
  "-------------------------------------------------------------",
  "\n創建新帳號有免費100抽",
  "\n指令：",
  "/roll 十連抽(有額度限制)",
  "/claim 領取免費抽卷(每天12小時刷新)",
  "/check 查詢總紀錄",
  "\n任一指令都會先檢查紀錄，並幫您創建",
  "不想直接抽的，可以先/check",
  "\n*註：目前是測試版，後續功能請諸位期待",
];

await lib.discord.channels["@0.3.0"].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content :'',
  embed: {
    title: "潛入女忍者：凜月",
    type: "rich",
    color: 0x0000aa, // Blue color
    description: conv.join("\n"),
    "image": {
      "url": `https://cdn.discordapp.com/attachments/986601364547330109/986601392305238077/ny.jpg`,
      "height": 0,
      "width": 0
    }
  },
  tts: false,
});