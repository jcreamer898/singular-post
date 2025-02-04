function singularPost(url, data) {
  const options = {
    method: "patch",
    contentType: "application/json",
    payload: JSON.stringify(data),
  };

  UrlFetchApp.fetch(url, options);
}

const getAPIUrl = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const url = spreadsheet.getRange("'Mapping'!B45").getValue();
  return url;
}

function readSheet() {
  const payload = getMappings();
  const apiUrl = getAPIUrl();

  console.log("Sending Payload");
  console.log(payload);
  
  singularPost(apiUrl, payload);
}

function getTotals(cellName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const fight1 = spreadsheet.getSheetByName("Fight 1");

  return fight1.getRange(cellName).getValue();
}

function createPayload() {
  const firstName1 = getTotals("B4");
  const firstName2 = getTotals("C4");

  return [{
    subCompositionId: "95d9c7ea-35b0-ac52-8c47-5b1c45123a37",
    payload: {
      "First Name 1": firstName1,
      "First Name 2": firstName2,
    }
  }]
}

function getMappings() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const generalInfo = spreadsheet.getSheetByName("General Info");
  const fights = spreadsheet.getSheets();

  const onlyFightSheets = fights.filter((sheet) => {
    const name = sheet.getName();
    return name.startsWith("Fight") && !name.endsWith("Mapping");
  });


  const fightMapping = spreadsheet.getSheetByName("Fight Mapping");
  const mapping = spreadsheet.getSheetByName("Mapping");
  // const currentFight = generalInfo.getRange("C22").getValue();
  
  const data = fightMapping.getDataRange().getValues();
  const payload = {};
  const fightData = {};

  // Fights
  for (const fight of onlyFightSheets) {
    const currentFight = fight.getName();
    
    for (const [field, cell, subCompID] of data.slice(1)) {
      if (!cell || !subCompID) {
        continue;
      }

      const value = spreadsheet.getRange(`'${currentFight}'!${cell}`).getValue();
      fightData[subCompID] = fightData[subCompID] || {};
      fightData[subCompID][currentFight] = fightData[subCompID][currentFight] || {}
      fightData[subCompID][currentFight][field] = value;
    }
  }

  for (const subCompId of Object.keys(fightData)) {
    payload[subCompId] = Object.entries(fightData[subCompId]).map(([key, val]) => {
      return val;
    });
  }

  // All the rest
  const mappings = mapping.getDataRange().getValues();
  for (const [field, cell, subCompID] of mappings.slice(1)) {
    if (!cell || !subCompID) {
      continue;
    }

    const [table, actualCell] = cell.toString().split(";")

    const value = spreadsheet.getRange(`'${table}'!${actualCell}`).getValue();
    payload[subCompID] = payload[subCompID] || {};
    payload[subCompID][field] = value;
  }

  const finalMapping = Object.keys(payload).reduce((memo, subCompID) => {
    const obj = payload[subCompID];
    memo.push({
      subCompositionId: subCompID,
      payload: obj
    });

    return memo;
  }, []);

  return finalMapping;
}
