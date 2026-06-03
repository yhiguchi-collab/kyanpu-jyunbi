const SHEET_NAME = 'entries'

function doGet(e) {
  const action = e.parameter.action || 'list'

  try {
    if (action === 'save') {
      const entry = JSON.parse(decodeURIComponent(e.parameter.data))
      upsertEntry(entry)
      return respond({ ok: true })
    }
    if (action === 'delete') {
      const name = decodeURIComponent(e.parameter.name)
      removeEntry(name)
      return respond({ ok: true })
    }
    return respond(listEntries())
  } catch (err) {
    return respond({ error: err.message })
  }
}

function upsertEntry(entry) {
  const sheet = getSheet()
  const values = sheet.getDataRange().getValues()

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === entry.name) {
      sheet.getRange(i + 1, 2, 1, 2).setValues([
        [JSON.stringify(entry.foods), JSON.stringify(entry.drinks)]
      ])
      return
    }
  }

  sheet.appendRow([entry.name, JSON.stringify(entry.foods), JSON.stringify(entry.drinks)])
}

function removeEntry(name) {
  const sheet = getSheet()
  const values = sheet.getDataRange().getValues()

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === name) {
      sheet.deleteRow(i + 1)
      return
    }
  }
}

function listEntries() {
  const values = getSheet().getDataRange().getValues()
  return values.slice(1)
    .filter(row => row[0])
    .map(row => ({
      name: row[0],
      foods: JSON.parse(row[1] || '[]'),
      drinks: JSON.parse(row[2] || '[]'),
    }))
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.getRange(1, 1, 1, 3).setValues([['name', 'foods', 'drinks']])
  }
  return sheet
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
}
