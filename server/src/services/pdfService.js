const PDFDocument = require('pdfkit');

exports.generateReport = async (reportData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];
      
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
      
      // Title
      doc.fontSize(20).text('MSME Resilience Report', { align: 'center' });
      doc.moveDown();
      
      // Generated date
      doc.fontSize(10).text(`Generated: ${new Date().toLocaleString()}`, { align: 'right' });
      doc.moveDown();
      
      // Summary section
      doc.fontSize(14).text('Summary', { underline: true });
      doc.fontSize(10);
      doc.text(`Total Suppliers: ${reportData.summary?.totalSuppliers || 0}`);
      doc.text(`Critical Suppliers: ${reportData.summary?.criticalSuppliers || 0}`);
      doc.text(`Overall Risk Score: ${reportData.summary?.overallRiskScore?.toFixed(1) || 'N/A'}`);
      doc.moveDown();
      
      // Suppliers list
      if (reportData.suppliers && reportData.suppliers.length > 0) {
        doc.fontSize(14).text('Suppliers', { underline: true });
        doc.fontSize(10);
        
        reportData.suppliers.forEach((supplier, index) => {
          doc.text(`${index + 1}. ${supplier.name} - ${supplier.location || 'Unknown'}`);
        });
      }
      
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

exports.generateSimulationReport = async (simulationData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];
      
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
      
      doc.fontSize(20).text('Disruption Simulation Report', { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(12);
      doc.text(`Scenario: ${simulationData.scenarioType || 'Custom'}`);
      doc.text(`Impacted Suppliers: ${simulationData.impactedCount || 0}`);
      doc.text(`Estimated Delay: ${simulationData.estimatedDelayDays || 0} days`);
      doc.text(`Cost Increase: $${simulationData.estimatedCostIncrease || 0}`);
      doc.text(`Production Impact: ${simulationData.productionImpact || 'N/A'}`);
      
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};