// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });
const create = require('../../helper/create.js');

// if(!(context.params.event.channel_id === "986410134894940240" || context.params.event.channel_id === "986603537788186644") ){
// throw "You cannot perform command in this channel"
// }
if (context.params.event.channel_id !== "986603537788186644") {
  throw "You cannot perform command in this channel";
}

await create.checkUser(context.params.event.member.user.id,context.params.event.member.nick,context.params.event.member.user.username,context.params.event.channel_id);

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

let ssr = [
  "<:face_ichika01:996211665953620048> 雪姬 初華",
  "<:face_kana01:996211600950308934> 花魁 香奈",
];
let nonLimitedssr = [
  "<:face_baal03:856758569000632380> 魔王 巴爾",
  "<:face_satan01:856202436619403294> 魔王 撒旦",
  "<:face_iblis01:856202436821254184> 魔王 伊布力斯",
  "<:face_salucia01:856202436720590878> 精靈王 賽露西亞",
  "<:face_lana01:856202436463820810> 矮人王 蘭兒",
  "<:face_lulu02:856202436859002890> 法斯公主 露露",
  "<:face_ks01:856202436275339294> 魔人偶 KS-VIII",
  "<:face_mesmiia01:856202437005279263> 智慧毛毛蟲 梅絲米奈雅",
  "<:face_chizuru01:856202436476534785> 復生公主 千鶴",
  "<:face_daphne01:856202436582703156> 煌星 妲絲艾菲娜",
  "<:face_hshs02:872468146857078855> 天使長 聖米勒",
  "<:face_aridya01:879959498771537950> 食夢 阿爾蒂雅",
  "<:face_lotiya01:879959543315070977> 千年血族 洛緹亞",
  "<:face_karina01:892790160796827669> 墮龍 凱茜菲娜",
  "<:face_Ibuki01:898520459526688768> 極樂之鬼 伊吹朱點",
  "<:face_inori01:910370419893223455> 音速魅影 祈",
  "<:face_miru01:950349904197328907> 貓娘Vtuber 杏仁咪嚕",
  "<:face_uruta01:950350092852928542> 古代勇者 烏魯塔",
  "<:face_ayane01:951824411483320390> 現代勇者 神田綾音",
  "<:face_muila01:952915736190390272> 未來勇者 牧愛菈",
  "<:face_faya01:971961353109635153> 高等魔族 法雅",
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
  "<:face_jolina01:915842751940141056> 冷豔美醫 嘉莉娜"
];
let specialR = "<:face_mia01:996211778126106756> 怪盜 米雅";
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
let ichika = 0;
let kana = 0;
let specialRCounter = 0;
let ssrCount = 0;
let srCount = 0;
let rCount = 0;
let nCount = 0;

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

let limitedCounter = parseInt(userData.limited_counter);

let ssrTracking = 0;
let srTracking = 0;
let rTracking = 0;
let nTracking = 0;

for (let i = 0; i < 10; i++) {
  let chance = Math.random() * 100;
  if (chance < 1) {
    let summerSSR = ssr[Math.floor(Math.random() * ssr.length)];
    switch (summerSSR) {
      case "<:face_ichika01:996211665953620048> 雪姬 初華":
        ichika += 1;
        break;
      case "<:face_kana01:996211600950308934> 花魁 香奈":
        kana += 1;
        break;
    }
    limitedCounter = 0;
    ssrTracking += 1;
    tenRolls.push("<:rarity_ssr:933339183848763412> " + summerSSR);
  } else if (chance < 2) {
    if (limitedCounter == 2) {
      let summerSSR = ssr[Math.floor(Math.random() * ssr.length)];
      switch (summerSSR) {
        case "<:face_ichika01:996211665953620048> 雪姬 初華":
          ichika += 1;
          break;
        case "<:face_kana01:996211600950308934> 花魁 香奈":
          kana += 1;
          break;
      }
      limitedCounter = 0;
      ssrTracking += 1;
      tenRolls.push("<:rarity_ssr:933339183848763412> " + summerSSR);
    } else {
      let nolimitssr =
        nonLimitedssr[Math.floor(Math.random() * nonLimitedssr.length)];
      ssrTracking += 1;
      ssrCount += 1;
      limitedCounter += 1;
      tenRolls.push("<:rarity_ssr:933339183848763412> " + nolimitssr);
    }
  } else if (chance < 10) {
    srCount += 1;
    srTracking += 1;
    tenRolls.push(
      "<:rarity_sr:933339169105772585> " +
        sr[Math.floor(Math.random() * sr.length)]
    );
  } else if (chance < 20) {
    specialRCounter += 1;
    rTracking += 1;
    tenRolls.push(
      "<:rarity_r:933339085639147551> " +
        specialR
    );
  } else if (chance < 42) {
    rCount += 1;
    rTracking += 1;
    tenRolls.push(
      "<:rarity_r:933339085639147551> " +
        r[Math.floor(Math.random() * r.length)]
    );
  } else {
    nCount += 1;
    nTracking += 1;
    tenRolls.push(
      "󠀠󠀠<:rarity_n:933338968873918554> " +
        n[Math.floor(Math.random() * n.length)]
    );
  }
}

userData.ichika = parseInt(userData.ichika) + ichika;
userData.kana = parseInt(userData.kana) + kana;
userData.mia = parseInt(userData.mia) + specialRCounter;
userData.ssr = parseInt(userData.ssr) + ssrCount;
userData.sr = parseInt(userData.sr) + srCount;
userData.r = parseInt(userData.r) + rCount;
userData.n = parseInt(userData.n) + nCount;
userData.rolls = parseInt(userData.rolls) - 10;
userData.limited_counter = limitedCounter;

async function insertRolls() {
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
      ichika: `${userData.ichika}`,
      kana: `${userData.kana}`,
      mia: `${userData.mia}`,
      ssr: `${userData.ssr}`,
      sr: `${userData.sr}`,
      r: `${userData.r}`,
      n: `${userData.n}`,
      rolls: `${userData.rolls}`,
      limited_counter: `${userData.limited_counter}`,
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

const imgN =
  "https://cdn.discordapp.com/attachments/986410134894940240/992127983882076250/N.gif";
const imgR =
  "https://cdn.discordapp.com/attachments/986410134894940240/992134724996837406/R.gif";
const imgSR =
  "https://cdn.discordapp.com/attachments/986410134894940240/992132605812154449/sr_no_slow.gif";
const imgSSR =
  "https://cdn.discordapp.com/attachments/986410134894940240/992117690422538320/ssr_slow.gif";

let imgUrl;

if (ssrTracking > 0) {
  imgUrl = imgSSR;
} else if (srTracking > 0) {
  imgUrl = imgSR;
} else if (rTracking > 0) {
  imgUrl = imgR;
} else {
  imgUrl = imgN;
}

let rollMessageList = [`<@!${context.params.event.member.user.id}> 十抽`];
let chosenMessage;

if (ssrTracking > 2) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 大收穫，三金得來不易！凱薩大人 `;
} else if (ssrTracking == 2) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 不愧是凱薩大人，抽SSR就跟抓女人一樣簡單…`;
} else if (ssrTracking == 1) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 能夠從暗黑的卡池中畢業，恭喜凱薩大人！`;
} else if (srTracking > 0) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 這次的收穫不小，凱薩大人`;
} else if (nTracking + rTracking == 10) {
  chosenMessage = `<@!${context.params.event.member.user.id}> 凱薩大人，有您的非洲才有其他人的歐洲，凜月深信，下次會更好的。`;
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
        name: "十抽結果\n-------------------------------------",
        value:
          [tenRolls.join("\n")].join("\n") + "\n\n剩餘抽卷： " + userData.rolls,
      },
    ],
    image: {
      url: imgUrl,
    },
  },

  tts: false,
});

// endpoints are executed as functions, click [> Run] below to test
return message;
