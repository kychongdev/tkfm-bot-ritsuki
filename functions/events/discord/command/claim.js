// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });
const create = require('../../helper/create.js');

// if(context.params.event.channel_id !== "986603537788186644" || context.params.event.channel_id !== "986410134894940240" ){
  // throw "You cannot perform command in this channel"
// }
if(context.params.event.channel_id !== "986603537788186644" ){
  throw "You cannot perform command in this channel"
}

await create.checkUser(context.params.event.member.user.id,context.params.event.member.nick,context.params.event.member.user.username,context.params.event.channel_id);

async function getUserData() {
  try {
    let res = await lib.googlesheets.query["@0.3.0"].select({
      range: `A:P`,
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
        title: `<@!${context.params.event.member.user.id}>抱歉主人，抽卡機貌似故障了`,
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

//To add result on it
let userData = await getUserData();

async function addFreeRolls() {
  let res = await lib.googlesheets.query["@0.3.0"].update({
    range: `A:P`,
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
    fields: {
      rolls: `${userData.rolls}`,
      daily_free_rolls: `${userData.daily_free_rolls}`,
      active_counter: `${userData.active_counter}`,
      day_active_counter: `${userData.day_active_counter}`
    },
  });
  return res;
}

if (userData.daily_free_rolls == 1) {
  let freeRoll = 30;
  if(parseInt(userData.active_counter) >= 7){
    freeRoll = 60
  } 
  userData.daily_free_rolls = 0
  userData.rolls = parseInt(userData.rolls) + freeRoll;
  userData.active_counter = parseInt(userData.active_counter) + 1;
  userData.day_active_counter = 1;
  
  try {
    await addFreeRolls();
    let message = await lib.discord.channels["@0.3.1"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `<@!${context.params.event.member.user.id}> 凜月明白了，計畫改變，潛入策略再調整`,
      tts: false,
    });
  } catch (e) {
    let message = await lib.discord.channels["@0.3.1"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: [`嗶嗶`].join("\n"),
      embed: {
        title: `<@!${context.params.event.member.user.id}>領取失敗`,
        type: "rich",
        color: 0x0000aa, // Blue color
        // description: 'You could add some information here for guild members to view!',
        fields: [
          {
            name: "故障代碼",
            value: [
              `Error: ${e}`,
              `故障訊息: 無法領取免費抽卷`,
              "請您聯繫Lone",
            ],
          },
        ],
      },
      tts: false,
    });
    throw e;
  }
} else {
  let message = await lib.discord.channels["@0.3.1"].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@!${context.params.event.member.user.id}> 恕在下直言，太頻繁的潛入會讓難度增加，請凱薩大人靜候時機`,
    tts: false,
  });
}
