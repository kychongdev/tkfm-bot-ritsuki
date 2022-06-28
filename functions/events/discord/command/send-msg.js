const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });
const message = context.params.event;
const value = message.data.options;

// const tempMessage ="目前統計\n總抽：17230\nSSR出貨：290\n概率： 1.683%\n夏日 伊布力斯：75張\n夏日 聖米勒：76張\n夏日 黑白諾艾莉：70張\n夏日 阿爾蒂雅：69張"

if (
  message.member.user.id == process.env.DC_HINORPIO_ID ||
  message.member.user.id == "604297541152145418" ||
  message.member.user.id == "617014628181999653" ||
  message.member.user.id == "501383204268408843" ||
  message.member.user.id == process.env.DC_LONE_ID
) {
  await lib.discord.channels['@0.3.0'].messages.create({
    "channel_id": `${context.params.event.channel_id}`,
    "content": `${value[0].value}`,
    // "content": `${tempMessage}`,    
    "tts": false,
  });
} else {
  await lib.discord.channels["@0.3.0"].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@!${context.params.event.member.user.id}> 笨蛋凱薩！你不要亂碰啦！`,
    tts: false,
  });
}
