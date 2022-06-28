// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

if(context.params.event.channel_id !== "986410134894940240" || context.params.event.channel_id !== "986603537788186644" ){
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
      content: `<@!${context.params.event.member.user.id}> 已幫你創建紀錄`,
      tts: false,
    });
  } catch (e) {
    let message = await lib.discord.channels["@0.3.1"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: [`嗶嗶`].join("\n"),
      embed: {
        title: `<@!${context.params.event.member.user.id}> 抱歉主人，抽卡機貌似故障了`,
        type: "rich",
        color: 0x0000aa, // Blue color
        // description: 'You could add some information here for guild members to view!',
        fields: [
          {
            name: "故障代碼",
            value: [`Error: ${e}`, `故障訊息: 無法創建用戶`, "請你聯繫Lone"],
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
    content: `<@!${context.params.event.member.user.id}>  您已有紀錄`,
    tts: false,
  });
}
