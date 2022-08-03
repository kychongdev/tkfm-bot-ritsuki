// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });


async function addRolls () {
  let res = await lib.googlesheets.query['@0.3.0'].select({
    range: `A:P`,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{}],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  
  let updatedRow = res.rows.map((x)=>{
    const find = x.fields;
    return {...x.fields, rolls:(parseInt(find.rolls) + 20)}
  })
  
  await lib.googlesheets.query['@0.3.0'].delete({
    range: `A:P`,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{}],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  
  await lib.googlesheets.query['@0.3.0'].insert({
    range: `A:P`,
    fieldsets: updatedRow
  });
}

await addRolls()

