/**
 * Paste this into the RSVP response Sheet: Extensions > Apps Script.
 * Deploy > New deployment > type "Web app" > Execute as: Me > Who has access: Anyone > Deploy.
 * Copy the Web app URL into STATS_URL in .env.local / Vercel.
 * It returns ONLY totals and the list of countries. Names, contacts and dietary answers are never exposed.
 */
function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sh = sheets[0];
  for (var i = 0; i < sheets.length; i++) {
    if (/^form responses/i.test(sheets[i].getName())) { sh = sheets[i]; break; }
  }
  var n = sh.getLastRow() - 1;
  var rows = n > 0 ? sh.getRange(2, 1, n, 9).getValues() : [];
  // Columns: A Timestamp | B Attendance | C Name | D Country | E Organisation | F Title | G Contact | H Additional guests | I Dietary
  var latest = {};
  rows.forEach(function (r) {
    var k = String(r[6] || r[2]).trim().toLowerCase();
    if (k) latest[k] = r; // one person = one entry, latest answer wins
  });
  var attending = 0, declined = 0, guests = 0, countries = {};
  Object.keys(latest).forEach(function (k) {
    var r = latest[k], a = String(r[1]).toLowerCase();
    if (a.indexOf('i will attend') === 0) {
      attending++;
      guests += 1 + (parseInt(r[7], 10) || 0);
      var c = String(r[3]).trim();
      if (c && c.toLowerCase() !== 'other') countries[c] = 1;
    } else if (a.indexOf('unable') === 0) {
      declined++;
    }
  });
  return ContentService
    .createTextOutput(JSON.stringify({
      attending: attending,
      declined: declined,
      totalGuests: guests,
      countries: Object.keys(countries).sort()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
