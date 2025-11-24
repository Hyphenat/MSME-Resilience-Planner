exports.sendEmail = async (to, subject, body) => {
  console.log(`Email would be sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Placeholder - returns success
  return { success: true, message: 'Email service not configured' };
};

exports.sendAlertEmail = async (userEmail, alertData) => {
  const subject = `Supply Chain Alert: ${alertData.title}`;
  const body = `
    Alert Level: ${alertData.severity}
    Message: ${alertData.message}
    Time: ${new Date().toISOString()}
  `;
  
  return exports.sendEmail(userEmail, subject, body);
};