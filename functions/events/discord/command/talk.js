// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const author = "347968046331068428"

let message = await lib.discord.channels['@0.3.1'].messages.create({
  channel_id: `986603537788186644`,
  content:
  `<@!${author}> test`,
  tts: false
});

return message;