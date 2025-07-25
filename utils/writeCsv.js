const fs = require('fs');
const path = require('path');
 
function writeCsv(data, filename) {
  if (!data?.length) return;
 
  const outputDir = path.join(__dirname, '../output');
  const filePath = path.join(outputDir, filename);
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
 
  fs.writeFileSync(filePath, `${header}\n${rows}`, 'utf8');
}
 
module.exports = { writeCsv };