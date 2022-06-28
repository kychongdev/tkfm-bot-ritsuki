// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

if(context.params.event.channel_id !== "986603537788186644" ){
  throw "You cannot perform command in this channel"
}

async function checkUserExist() {
  let res = await lib.googlesheets.query["@0.3.0"].count({
    range: `A:J`,
    bounds: "FIRST_EMPTY_ROW",
    where: [
      {
        user_id__is: `${context.params.event.member.user.id}`,
      },
    ],
    limit: {
      count: 0,
      offset: 0,
    },
  });
  return res.count;
}

async function createNewUser() {
  let res = await lib.googlesheets.query["@0.3.0"].insert({
    range: `A:M`,
    fieldsets: [
      {
        user_id: `${context.params.event.member.user.id}`,
        nick_name: `${context.params.event.member.nick}`,
        user_name: `${context.params.event.member.user.username}`,
        s_iblis: `0`,
        s_milae: `0`,
        s_noel: `0`,
        s_aridya: `0`,
        sr: `0`,
        r: `0`,
        n: `0`,
        rolls: `100`,
        daily_free_rolls: "1",
      },
    ],
  });
}

let userExist = await checkUserExist();

let userCreated;
if (userExist == 0) {
  try {
    await createNewUser();
    let message = await lib.discord.channels["@0.3.1"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `<@!${context.params.event.member.user.id}> 承知，凜月將潛入抽卡池`,
      tts: false,
    });
  } catch (e) {
    let message = await lib.discord.channels["@0.3.1"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: [`嗶嗶`].join("\n"),
      embed: {
        title: "抱歉主人，抽卡機貌似故障了，",
        type: "rich",
        color: 0x0000aa, // Blue color
        // description: 'You could add some information here for guild members to view!',
        fields: [
          {
            name: "故障代碼",
            value: [
              `Error code: 101`,
              `Error: ${e}`,
              `故障訊息: 無法創建用戶`,
              "請你聯繫Lone",
            ],
          },
        ],
      },
      tts: false,
    });
    throw e;
  }
}

async function getUserData() {
  try {
    let res = await lib.googlesheets.query["@0.3.0"].select({
      range: `A:M`,
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
  (parseInt(userData.s_iblis) +
    parseInt(userData.s_milae) +
    parseInt(userData.s_noel) +
    parseInt(userData.s_aridya)) /
  (parseInt(userData.s_iblis) +
    parseInt(userData.s_milae) +
    parseInt(userData.s_noel) +
    parseInt(userData.s_aridya) +
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
          "夏日 伊布力斯: " + userData.s_iblis,
          "夏日 聖米勒: " + userData.s_milae,
          "夏日 黑白諾艾莉: " + userData.s_noel,
          "夏日 阿爾蒂雅: " + userData.s_aridya,
          "SR: " + userData.sr,
          "R: " + userData.r,
          "N: " + userData.n,
          "歐洲血統: " + (averageRollPercentage*100).toFixed(3) + "%",
          "剩餘抽卷: " + userData.rolls,
          "今日免費領取: " + userData.daily_free_rolls,
        ].join("\n"),
      },
    ],
  },
  tts: false,
});
