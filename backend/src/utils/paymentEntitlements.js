// Deterministic entitlement selection: the browser never decides what access
// a payment buys. Kept pure so it can be tested without MongoDB or Paystack.
function entitlementForPlan(plan, plans) {
  if (String(plan || '').startsWith('certificate-fee:')) {
    return { type: 'course', courseId: String(plan).slice('certificate-fee:'.length) };
  }
  const config = plans[plan];
  if (!config) return null;
  if (config.type === 'course') return { type: 'course', courseId: config.courseId };
  if (config.type === 'subscription') return { type: 'premium', months: plan === 'premium-yearly' ? 12 : 1 };
  if (config.type === 'sponsorship') return { type: 'sponsorship' };
  return null;
}

function paymentMatchesRecord(data, record) {
  return Boolean(data && record && data.status === 'success' &&
    String(data.reference) === String(record.reference) &&
    Number(data.amount) === Number(record.amount) * 100 &&
    String(data.currency || '').toUpperCase() === String(record.currency || '').toUpperCase() &&
    (!record.customerEmail || !data.customer?.email ||
      String(data.customer.email).trim().toLowerCase() === String(record.customerEmail).trim().toLowerCase()));
}

function entitlementExpiry(paidAt, months) {
  const date = new Date(paidAt);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid provider payment timestamp');
  date.setUTCMonth(date.getUTCMonth() + months);
  return date;
}

module.exports = { entitlementForPlan, paymentMatchesRecord, entitlementExpiry };
