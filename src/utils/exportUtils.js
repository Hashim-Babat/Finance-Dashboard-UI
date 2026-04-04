/**
 * Export transactions as CSV
 */
export function exportToCSV(transactions, filename = 'transactions') {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Notes'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount.toFixed(2),
    `"${t.notes || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

/**
 * Export transactions as JSON
 */
export function exportToJSON(transactions, filename = 'transactions') {
  const jsonContent = JSON.stringify(transactions, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

/**
 * Download file using Blob API
 */
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
