const orderTransitions = { draft: ['pending_payment', 'cancelled'], pending_payment: ['paid', 'cancelled'], paid: ['fulfilling', 'refunded'], fulfilling: ['completed', 'refunded'], completed: ['refunded'], cancelled: [], refunded: [] };
const paymentTransitions = { created: ['authorized', 'failed', 'cancelled'], authorized: ['captured', 'voided'], captured: ['refunded'], failed: [], cancelled: [], voided: [], refunded: [] };
export function assertCommerceTransition(kind, from, to) {
  const table = kind === 'order' ? orderTransitions : paymentTransitions;
  if (!table[from]?.includes(to)) throw Object.assign(new Error(`Invalid ${kind} transition: ${from} -> ${to}`), { status: 409 });
}
export function assertDryRunProvider(provider) {
  if (provider !== 'dry-run') throw Object.assign(new Error('Only dry-run payment provider is enabled'), { status: 400 });
}
