// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

// const maintenanceMessage = "此功能暫時無限期維修"

// await lib.discord.channels["@0.3.0"].messages.create({
  // channel_id: `${context.params.event.channel_id}`,
  // content: `<@!${context.params.event.member.user.id}> ${maintenanceMessage}`,
  // tts: false,
// });
 
const message = context.params.event;
// const value = message.data.options;

async function getAllUser(){
  let users = await lib.googlesheets.query['@0.3.0'].select({
    range: `B:P`,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{}],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  return users.rows;
}

let user = await getAllUser();
let belowFiftyRoll = user.filter((e) =>{
  return e.fields.percentage !== "#DIV/0!";
}).filter((e) =>{
  return e.fields.percentage !== '';
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) < 50
}).reduce(function(prev, current) {
    return (parseFloat(prev.fields.percentage) > parseFloat(current.fields.percentage)) ? prev : current
})

let hundredRoll = user.filter((e) =>{
  return e.fields.percentage !== "#DIV/0!" 
}).filter((e)=>{
  return e.fields.percentage !== ''
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) > 100
}).filter((e)=>{
return parseInt(e.fields.total_roll_spend) < 210
}).reduce(function(prev, current) {
    return (parseInt(prev.fields.percentage) > parseInt(current.fields.percentage)) ? prev : current
})

let twoHundredRoll = user.filter((e) =>{
  return e.fields.percentage !== "#DIV/0!" 
}).filter((e)=>{
  return e.fields.percentage !== ''
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) > 200
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) < 310
}).reduce(function(prev, current) {
    return (parseFloat(prev.fields.percentage) > parseFloat(current.fields.percentage)) ? prev : current
})

let threeHundredRoll = user.filter((e) =>{
  return e.fields.percentage !== "#DIV/0!" 
}).filter((e)=>{
  return e.fields.percentage !== ''
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) > 300
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) < 410
}).reduce(function(prev, current) {
    return (parseFloat(prev.fields.percentage) > parseFloat(current.fields.percentage)) ? prev : current
})

let fourHundredRoll = user.filter((e) =>{
  return e.fields.percentage !== "#DIV/0!" 
}).filter((e)=>{
  return e.fields.percentage !== ''
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) > 400
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) < 510
}).reduce(function(prev, current) {
    return (parseFloat(prev.fields.percentage) > parseFloat(current.fields.percentage)) ? prev : current
})

let fiveHundredRoll = user.filter((e) =>{
  return e.fields.percentage !== "#DIV/0!" 
}).filter((e)=>{
  return e.fields.percentage !== ''
}).filter((e)=>{
  return parseInt(e.fields.total_roll_spend) > 500
}).reduce(function(prev, current) {
    return (parseFloat(prev.fields.percentage) > parseFloat(current.fields.percentage)) ? prev : current
})

function formatString(obj){
  return `\n用戶名稱: ${obj.user_name} \n用戶綽號: ${(typeof obj.nick_name === "null")? "無":obj.nick_name} \n夏日 伊布力斯: ${obj.s_iblis} \n夏日 聖米勒: ${obj.s_milae} \n夏日 黑白諾艾莉: ${obj.s_noel} \n夏日 阿爾蒂雅: ${obj.s_aridya} \n已花抽卷: ${obj.total_roll_spend} \n歐洲血統: ${parseFloat(obj.percentage).toFixed(4)}%`
}

// if (
  // message.member.user.id == process.env.DC_HINORPIO_ID ||
  // message.member.user.id == "604297541152145418" ||
  // message.member.user.id == "617014628181999653" ||
  // message.member.user.id == "501383204268408843" 
  // // message.member.user.id == process.env.DC_LONE_ID
// ) {
  await lib.discord.channels["@0.3.0"].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '報告凱薩大人，凜月已在紀錄中找到了天選之人',
    embed:{
      title: "歐洲血統排名",
      type: "rich",
      color: 0x0000aa, // Blue color
      description:  "",
      fields:[{
        name: "100抽~200抽",
        value: formatString(hundredRoll.fields)
      },{
        name: "200抽～300抽",
        value: formatString(twoHundredRoll.fields)
      },{
        name: "300抽～400抽",
        value: formatString(threeHundredRoll.fields)
      },{
        name: "400抽～500抽",
        value: formatString(fourHundredRoll.fields)
      },{
        name: "500抽以上",
        value: formatString(fiveHundredRoll.fields)
      }]
    },
    tts: false,
  });
// } else {
  // await lib.discord.channels["@0.3.0"].messages.create({
    // channel_id: `${context.params.event.channel_id}`,
    // content: `<@!${context.params.event.member.user.id}> 凱薩大人，請不要亂碰！這是千鶴公主最珍愛的東西`,
    // tts: false,
  // });
// }
//主上！對...對不起，這任務失敗了。凜月願意接受處