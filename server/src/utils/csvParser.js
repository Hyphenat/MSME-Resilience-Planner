const csv = require('csv-parser');
const fs = require('fs');

exports.parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

exports.parseCSVBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const lines = buffer.toString().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim() || '';
        });
        results.push(obj);
      }
    }
    resolve(results);
  });
};