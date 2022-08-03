// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });
const create = require('../../helper/create.js');

//986410134894940240
if(context.params.event.channel_id !== "986603537788186644" ){
  throw "You cannot perform command in this channel"
}

await create.checkUser(context.params.event.member.user.id,context.params.event.member.nick,context.params.event.member.user.username,context.params.event.channel_id);

async function getUserData() {
  try {
    let res = await lib.googlesheets.query["@0.3.0"].select({
      range: `A:Q`,
      bounds: "FIRST_EMPTY_ROW",
      where: [
        {
          user_id: `${context.params.event.member.user.id}`,
        },
      ],
      limit: {
        count: 0,
        offset: 0,
      },
    });
    return res.rows[0].fields;
  } catch (e) {
    let message = await lib.discord.channels["@0.3.1"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: [`嗶嗶`].join("\n"),
      embed: {
        title: `<@!${context.params.event.member.user.id}> 抱歉主上，抽卡機貌似故障了`,
        type: "rich",
        color: 0x0000aa, // Blue color
        // description: 'You could add some information here for guild members to view!',
        fields: [
          {
            name: "故障代碼",
            value: [
              `Error: ${e}`,
              `故障訊息: 無法取得用戶資料`,
              "請您聯繫Lone",
            ],
          },
        ],
      },
      tts: false,
    });
    throw e;
  }
}

let userData = await getUserData();
let averageRollPercentage =
  (parseInt(userData.ichika) +
    parseInt(userData.kana) +
    parseInt(userData.ssr)) /
  (parseInt(userData.ichika) +
    parseInt(userData.kana) +
    parseInt(userData.mia) +
    parseInt(userData.ssr) +
    parseInt(userData.sr) +
    parseInt(userData.r) +
    parseInt(userData.n));
  
let averageRollPercentageNoLimited =
(parseInt(userData.ichika) +
  parseInt(userData.kana)) /
(parseInt(userData.ichika) +
  parseInt(userData.kana) +
  parseInt(userData.mia) +
  parseInt(userData.ssr) +
  parseInt(userData.sr) +
  parseInt(userData.r) +
  parseInt(userData.n));

let message = await lib.discord.channels["@0.3.1"].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `<@!${context.params.event.member.user.id}> 好的，凱薩大人，這是目前的任務回報`,
  embed: {
    type: "rich",
    color: 0x0000aa, // Blue color
    // description: 'You could add some information here for guild members to view!',
    fields: [
      {
        name: "抽卡總紀錄",
        value: [
          "<:face_ichika01:996211665953620048> 雪姬 初華: " + userData.ichika,
          "<:face_kana01:996211600950308934> 花魁 香奈: " + userData.kana,
          "<:face_mia01:996211778126106756> 怪盜 米雅: " + userData.mia,
          "<:rarity_ssr:933339183848763412>（常駐）: " + userData.ssr,
          "<:rarity_sr:933339169105772585> : " + userData.sr,
          "<:rarity_r:933339085639147551> : " + userData.r,
          "<:rarity_n:933338968873918554> : " + userData.n,
          "歐洲血統（無常駐）: " + (averageRollPercentageNoLimited*100).toFixed(3) + "%",
          "歐洲血統（包括常駐）: " + (averageRollPercentage*100).toFixed(3) + "%",
          "剩餘抽卷: " + userData.rolls,
          "今日免費領取: " + userData.daily_free_rolls,
          "目前活躍天數: " + userData.active_counter
        ].join("\n"),
      },
    ],
  },
  tts: false,
});
