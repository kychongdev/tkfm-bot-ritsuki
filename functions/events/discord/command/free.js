// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });

// async function updateRoll() {
  // let res = await lib.googlesheets.query["@0.3.0"].update({
    // range: `A:M`,
    // bounds: "FIRST_EMPTY_ROW",
    // fields: {
     // 'daily_free_rolls' : 1,
    // },
  // });
  // return res;
// }
