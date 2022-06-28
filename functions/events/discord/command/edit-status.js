// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let activitytypelist = [
  `GAME`,
  `LISTENING`,
  `WATCHING`,
  `COMPETING`,
]

let statusList = [
  `ONLINE`,
  `DND`,
  `IDLE`,
  `INVISIBLE`,
]

function checkRole(roleList){
  for (let i = 0; i < roleList.length; i++){
    if(roleList[i] == 842646164511785001 || roleList[i] == 963088404650819614 
    || context.params.event.member.user.id == 347968046331068428)
      return true
  }
  return false
}

function checkActivityTypeList(activityType){
  for (let i = 0; i < activitytypelist.length; i++) {
    if(activityType == activitytypelist[i]){
      return true
    }
  }
  return false
}

function checkStatusList(status){
  for (let i = 0; i < statusList.length; i++) {
    if(status == statusList[i]){
      return true
    }
  }
  return false
}

if(checkRole(context.params.event.member.roles)){
  if(!checkActivityTypeList(context.params.event.data.options[1].value)){
    await lib.discord.channels['@0.3.0'].messages.create({
      "channel_id": `${context.params.event.channel_id}`,
      "content": `<@!${context.params.event.member.user.id}> ACTIVITY_TYPE_WRONG：活動分類錯誤`,
      "tts": false,
    });
  }else if(!checkStatusList(context.params.event.data.options[2].value)){
    await lib.discord.channels['@0.3.0'].messages.create({
      "channel_id": `${context.params.event.channel_id}`,
      "content": `<@!${context.params.event.member.user.id}> STATUS_WRONG：狀態錯誤`,
      "tts": false,
    });
  }else{
    let result = await lib.discord.users['@0.1.1'].me.status.update({
      activity_name: `${context.params.event.data.options[0].value}`,
      activity_type: `${context.params.event.data.options[1].value}`,
      status: `${context.params.event.data.options[2].value}`
    });
    await lib.discord.channels['@0.3.0'].messages.create({
      "channel_id": `${context.params.event.channel_id}`,
      "content": `<@!${context.params.event.member.user.id}> STATUS_UPDATE_SUCCESS：狀態更新成功`,
      "tts": false,
    });
  }
}else{
  await lib.discord.channels['@0.3.0'].messages.create({
    "channel_id": `${context.params.event.channel_id}`,
    "content": `<@!${context.params.event.member.user.id}> 笨蛋凱薩！你不要亂碰啦！`,
    "tts": false,
  });
}
