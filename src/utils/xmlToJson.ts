const { XMLParser} = require("fast-xml-parser");

const xmlToJson = (xmlData: string): any => {
  const parser = new XMLParser();
  let jsonObj = parser.parse(xmlData);
  return jsonObj; 
}

export default xmlToJson;

