// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

if(!(context.params.event.channel_id === "986410134894940240" || context.params.event.channel_id === "986603537788186644") ){
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
    //TODO
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

// let ssr = [ "夏日 伊布力斯" , "夏日 聖米勒",
// "夏日 黑白諾艾莉", "夏日 阿爾蒂雅"];
// let sr = ["魔管家 艾可", "聖騎士長 雷歐娜",
// "神官長 菲歐菈", "女忍者 凜月", "劍聖 神無雪",
// "妖狐 靜", "大將軍 朱諾安", "天才女軍師 布蘭妮", "史萊姆女王 娜芙菈菈", "魔法少女 托特拉",
// "最後的銀龍 普莉希拉", "刺針 嘉維爾", "精靈舞者 塔諾西雅"];
// let r = ["雙蛇軍團護士長 艾琳", "貓妖 娜娜", "龍女 伊維絲", "犬人族 朵拉", "魅魔 撤芭絲", "美人魚 瑪蓮",
// "流浪魔法師 尤依", "暗黑精靈 索拉卡", "南瓜仙子 帕奈奈", "人馬女僕 蘇菲", "冷豔美醫 嘉莉娜"];
// let n = ["法斯帝國士兵 賽蓮", "法斯帝國法師 佩托拉", "魔族戰士 芙蕾", "魔族法師 瑪努艾拉", "烈日國武士 桔梗", "烈日國巫女 楓",
// "精靈射手 奧菈", "矮人戰士 可兒", "雙蛇軍團士兵 夏琳", "聖光騎士 瑪蒂娜", "主神教團僧兵 克蕾雅",
// "史萊姆娘 蘿爾", "牛女 米諾", "蛇女 拉米亞", "鳥身女妖 哈比", "法斯精銳近衛 安娜", "法斯精銳騎士 布蘭", "法斯精銳法師 諾諾可",
// "懲戒天使", "福音天使", "試作機三號"];

// you can write whatever javascript you'd like
// logs are visible from the [? Help] popup on right
let ssr = [
  "<:face_iblis06:983334594122240050> 夏日 伊布力斯",
  "<:face_hshs03:983334661491134525> 夏日 聖米勒",
  "<:face_noel03:983334725437489222> 夏日 黑白諾艾莉",
  "<:face_aridya02:983334741442973716> 夏日 阿爾蒂雅",
];
let sr = [
  "<:face_ik01:856202436162617385> 魔管家 艾可",
  "<:face_leona01:856202438160023582> 聖騎士長 雷歐娜",
  "<:face_fiora01:862655189046788126> 神官長 菲歐菈",
  "<:face_ritsuki01:856202436838817881> 女忍者 凜月",
  "<:face_minayomi02:895195995644784652> 劍聖 神無雪",
  "<:face_shizuka03:856202437391548447> 妖狐 靜",
  "<:face_juneau01:862655188540063754> 大將軍 朱諾安",
  "<:face_britney01:856202435541991454> 天才女軍師 布蘭妮",
  "<:face_nafrala01:856202437035032616> 史萊姆女王 娜芙菈菈",
  "<:face_tyrella01:864842330216202300> 魔法少女 托特拉",
  "<:face_pulicia01:892790161023328286> 最後的銀龍 普莉希拉",
  "<:face_Janelle01:898520473485312050> 刺針 嘉維爾",
  "<:face_tanocia01:971961423594913802> 精靈舞者 塔諾西雅",
];
let r = [
  "<:face_irene01:862655188141604885> 雙蛇軍團護士長 艾琳",
  "<:face_nana05:859792644385013780> 爛貓 娜娜",
  "<:face_iris01:856202437022711819> 龍女 伊維絲",
  "<:IMG_4759:986447466499043338> 犬人族 朵拉",
  "<:IMG_4762:986447431585640489> 魅魔 撤芭絲",
  "<:face_mermaid01:858240484681580584> 美人魚 瑪蓮",
  "<:IMG_4760:986447459964317729> 流浪魔法師 尤依",
  "<:IMG_4763:986446383613636638> 暗黑精靈 索拉卡",
  // "<:face_panana03:957588087658147880> 南瓜仙子 帕奈奈",
  "<:face_Sophie01:914060282748342283> 人馬女僕 蘇菲",
  "<:face_jolina01:915842751940141056> 冷豔美醫 嘉莉娜",
];
let n = [
  "<:face_saria01:862655188996325396> 法斯帝國士兵 賽蓮",
  "<:IMG_4768:986446433282576434> 法斯帝國法師 佩托拉",
  "<:IMG_4773:986447818782830602> 魔族戰士 芙蕾",
  "<:face_manuella01:856202437140021280> 魔族法師 瑪努艾拉",
  "<:IMG_4777:986446525171392512> 烈日國武士 桔梗",
  "<:IMG_4774:986446479830962258> 烈日國巫女 楓",
  "<:IMG_4770:986446454283452426> 精靈射手 奧菈",
  "<:face_kani01:932195854331310131> 矮人戰士 可兒",
  "<:face_cl01:922397008927555695> 雙蛇軍團士兵 夏琳",
  "<:IMG_4780:986446568209154068> 聖光騎士 瑪蒂娜",
  "<:face_nun01:896316233547386900> 主神教團僧兵 克蕾雅",
  "<:face_lori01:862655188388413481> 史萊姆娘 蘿爾",
  "<:face_minnow01:862655188166901771> 牛女 米諾",
  "<:IMG_4781:986446579575709736> 蛇女 拉米亞",
  "<:face_harpy01:967041414556971039> 鳥身女妖 哈比",
  "<:face_anna05:973400263069159524> 法斯精銳近衛 安娜",
  "<:IMG_4783:986446605400023090> 法斯精銳騎士 布蘭",
  "<:face_natasha01:856202438670680094> 法斯精銳法師 諾諾可",
  "<:face_angelp:872468146982895646> 懲戒天使",
  "<:face_angelb:872468146617999440> 福音天使",
  "<:IMG_4776:986446509069463593> 試作機三號",
];

let tenRolls = [];
let sIblis = 0;
let sMilae = 0;
let sNoel = 0;
let sAridya = 0;
let srCount = 0;
let rCount = 0;
let nCount = 0;

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
        title: "抱歉主人，抽卡機貌似故障了，",
        type: "rich",
        color: 0x0000aa, // Blue color
        // description: 'You could add some information here for guild members to view!',
        fields: [
          {
            name: "故障代碼",
            value: [
              `Error code: 102`,
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

if (userData.rolls == 0) {
  let message = await lib.discord.channels["@0.3.1"].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@!${context.params.event.member.user.id}> 非常抱歉凱薩大人，剛剛的潛入被刃太發現了…只能等守備變弱再潛入了`,
    tts: false,
  });
  return message;
}

let ssrTracking = 0;
let srTracking = 0;
let nrTracking = 0;

for (let i = 0; i < 10; i++) {
  let chance = Math.random() * 100;
  if (chance < 1.6) {
    let summerSSR = ssr[Math.floor(Math.random() * ssr.length)];
    switch (summerSSR) {
      case "<:face_iblis06:983334594122240050> 夏日 伊布力斯":
        sIblis += 1;
        break;
      case "<:face_hshs03:983334661491134525> 夏日 聖米勒":
        sMilae += 1;
        break;
      case "<:face_noel03:983334725437489222> 夏日 黑白諾艾莉":
        sNoel += 1;
        break;
      case "<:face_aridya02:983334741442973716> 夏日 阿爾蒂雅":
        sAridya += 1;
        break;
    }
    ssrTracking += 1;
    tenRolls.push("<:rarity_ssr:933339183848763412> " + summerSSR);
  } else if (chance < 11.6) {
    srCount += 1;
    srTracking += 1;
    tenRolls.push(
      "<:rarity_sr:933339169105772585> " +
        sr[Math.floor(Math.random() * sr.length)]
    );
  } else if (chance < 43.6) {
    rCount += 1;
    nrTracking += 1;
    tenRolls.push(
      "<:rarity_r:933339085639147551> " +
        r[Math.floor(Math.random() * r.length)]
    );
  } else {
    nCount += 1;
    nrTracking += 1;
    tenRolls.push(
      "󠀠󠀠<:rarity_n:933338968873918554> " +
        n[Math.floor(Math.random() * n.length)]
    );
  }
}

userData.s_iblis = parseInt(userData.s_iblis) + sIblis;
userData.s_milae = parseInt(userData.s_milae) + sMilae;
userData.s_noel = parseInt(userData.s_noel) + sNoel;
userData.s_aridya = parseInt(userData.s_aridya) + sAridya;
userData.sr = parseInt(userData.sr) + srCount;
userData.r = parseInt(userData.r) + rCount;
userData.n = parseInt(userData.n) + nCount;
userData.rolls = parseInt(userData.rolls) - 10;

async function insertRolls() {
  let res = await lib.googlesheets.query["@0.3.0"].update({
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
    fields: {
      s_iblis: `${userData.s_iblis}`,
      s_milae: `${userData.s_milae}`,
      s_noel: `${userData.s_noel}`,
      s_aridya: `${userData.s_aridya}`,
      sr: `${userData.sr}`,
      r: `${userData.r}`,
      n: `${userData.n}`,
      rolls: `${userData.rolls}`,
    },
  });
  return res;
}
try {
  await insertRolls();
} catch (e) {
  let message = await lib.discord.channels["@0.3.1"].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: [`嗶嗶`].join("\n"),
    embed: {
      title: "抱歉主上，抽卡機貌似故障了，",
      type: "rich",
      color: 0x0000aa, // Blue color
      // description: 'You could add some information here for guild members to view!',
      fields: [
        {
          name: "故障代碼",
          value: [`Error: ${e}`, `故障訊息: 抽卡出現問題`, "請您聯繫Lone"],
        },
      ],
    },
    tts: false,
  });
  throw e;
}

let rollMessageList = [
  `<@!${context.params.event.member.user.id}> 十抽`,
];
let chosenMessage;

if (ssrTracking > 2) {
chosenMessage = `<@!${context.params.event.member.user.id}> 大收穫，三金得來不易！凱薩大人 `;
} else if (ssrTracking == 2) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 不愧是凱薩大人，抽SSR就跟抓女人一樣簡單…`;
} else if (ssrTracking == 1) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 能夠從暗黑的卡池中畢業，恭喜凱薩大人！`;
} else if (srTracking > 0) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 這次的收穫不小，凱薩大人`;
} else if (nrTracking == 10) {
  chosenMessage =
    `<@!${context.params.event.member.user.id}> 凱薩大人，有您的非洲才有其他人的歐洲，凜月深信，下次會更好的。`;
} else {
  chosenMessage =
    rollMessageList[Math.floor(Math.random() * rollMessageList.length)];
}

// // `context` is automatically populated with HTTP request data
// // you can modify `context.params` test data via [Payload] below
let message = await lib.discord.channels["@0.3.1"].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: chosenMessage,
  embed: {
    type: "rich",
    color: 0x0000aa, // Blue color
    // description: 'You could add some information here for guild members to view!',
    fields: [
      {
        name: "十抽結果：",
        value: [tenRolls.join("\n")].join("\n") + "\n\n剩餘抽卷： " +userData.rolls,
      },
    ],
  },
  tts: false,
});

// endpoints are executed as functions, click [> Run] below to test
return message;
