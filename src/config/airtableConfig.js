// config airtable
var Airtable = require("airtable");

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "key18X8fJ9bFspylW"
});

export default Airtable.base("appX27JEUGPmaO2tj");
