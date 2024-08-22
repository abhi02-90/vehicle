import xmlToJson from "../../../utils/xmlToJson";

describe("Xml to Json method", () => {
  it("should return a json object from xml input", async () => {
    const sampleXml = `
        <Response xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <Count>11463</Count>
        <Message>Response returned successfully</Message>
        <Results>
            <AllVehicleMakes>
                <Make_ID>12858</Make_ID>
                <Make_Name>#1 ALPINE CUSTOMS</Make_Name>
            </AllVehicleMakes>
        </Results>
        </Response>    
    `;
    const jsonObj = xmlToJson(sampleXml);
    expect(jsonObj.Response.Count).toBe(11463);
  })
});