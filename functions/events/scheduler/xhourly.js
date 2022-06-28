const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

async function updateRoll() {
  let res = await lib.googlesheets.query["@0.3.0"].update({
    range: `A:M`,
    bounds: "FIRST_EMPTY_ROW",
    fields: {
     'daily_free_rolls' : 1,
    },
  });
  return res;
}

const author = "347968046331068428"

try {
  await updateRoll();
  await lib.discord.channels["@0.3.1"].messages.create({
    channel_id: "986603537788186644",
    content: `${new Date()} 免費抽卷已更新`,
    tts: false,
  });
  await lib.discord.channels["@0.3.1"].messages.create({
    channel_id: "786918057054044181",
    content: `${new Date()} 免費抽卷已更新`,
    tts: false,
  });
} catch (e) {
  await lib.discord.channels["@0.3.1"].messages.create({
    channel_id: "986603537788186644",
    content: `<@!${author}> 凱撒大人，更新好像故障了！`,
    tts: false,
  });
}