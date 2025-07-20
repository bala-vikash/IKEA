function convertToCSV(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(obj =>
    headers.map(field => `"${(obj[field] || '').replace(/"/g, '""')}"`).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

module.exports = convertToCSV;
