// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

async function checkUser(id, nickname, username, channel_id) {
  let res = await lib.googlesheets.query["@0.3.0"].count({
    range: `A:P`,
    bounds: "FIRST_EMPTY_ROW",
    where: [
      {
        user_id__is: `${id}`,
      },
    ],
    limit: {
      count: 0,
      offset: 0,
    },
  });

  if (res.count == 0) {
    try {
      await lib.googlesheets.query["@0.3.0"].insert({
        range: `A:Q`,
        fieldsets: [
          {
            user_id: `${id}`,
            nick_name: `${nickname}`,
            user_name: `${username}`,
            ichika: `0`,
            kana: `0`,
            mia: `0`,
            ssr: "0",
            sr: `0`,
            r: `0`,
            n: `0`,
            rolls: `100`,
            daily_free_rolls: "1",
            limited_counter: "0",
            active_counter: "0",
            day_active_counter: "0"
          },
        ],
      });
      let message = await lib.discord.channels["@0.3.1"].messages.create({
        channel_id: `${channel_id}`,
        content: `<@!${id}> 承知，凜月將潛入抽卡池`,
        tts: false,
      });
    } catch (e) {
      //TODO
      let message = await lib.discord.channels["@0.3.1"].messages.create({
        channel_id: `${channel_id}`,
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
}

exports.checkUser = checkUser;
