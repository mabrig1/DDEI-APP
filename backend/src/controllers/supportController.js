const crypto = require('crypto');
const SupportTicket = require('../models/SupportTicket');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { sendCustomEmail } = require('../utils/mailer');

const CATEGORIES = new Set(['payment', 'account', 'course', 'certificate', 'other']);
const STATUSES = new Set(['open', 'awaiting_user', 'resolved']);
const REFERENCE_PATTERN = /^dsb_[a-f0-9]{16}$/;

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function createTicket(req, res) {
  const category = clean(req.body.category, 40);
  const subject = clean(req.body.subject, 120);
  const description = clean(req.body.description, 3000);
  const paymentReference = clean(req.body.paymentReference, 100);
  if (!CATEGORIES.has(category) || subject.length < 4 || description.length < 10) {
    return res.status(400).json({ message: 'Choose a category and provide a subject and description.' });
  }
  if (paymentReference) {
    if (!REFERENCE_PATTERN.test(paymentReference)) {
      return res.status(400).json({ message: 'Invalid payment reference.' });
    }
    const owned = await Subscription.exists({ reference: paymentReference, user: req.userId });
    if (!owned) return res.status(403).json({ message: 'That payment is not linked to your account.' });
  }
  const ticket = await SupportTicket.create({
    number: 'DSB-' + crypto.randomBytes(6).toString('hex').toUpperCase(),
    requester: req.userId,
    category, subject, description,
    paymentReference: paymentReference || null,
  });
  const requester = await User.findById(req.userId).select('name email');
  if (process.env.ADMIN_NOTIFY_EMAIL) {
    await sendCustomEmail(process.env.ADMIN_NOTIFY_EMAIL,
      'DDEI support request ' + ticket.number,
      'A learner submitted a support request.\nTicket: ' + ticket.number +
      '\nCategory: ' + ticket.category + '\nSubject: ' + ticket.subject +
      '\nRequester: ' + (requester?.email || 'registered learner') +
      '\nOpen the DDEI administrator Support tab to respond.').catch(() => {});
  }
  return res.status(201).json({ ticket });
}

async function listMyTickets(req, res) {
  const tickets = await SupportTicket.find({ requester: req.userId })
    .sort({ updatedAt: -1 }).limit(50);
  return res.json({ tickets });
}

async function listAdminTickets(req, res) {
  const requestedStatus = clean(req.query.status, 30);
  const filter = STATUSES.has(requestedStatus) ? { status: requestedStatus } : {};
  const tickets = await SupportTicket.find(filter)
    .populate('requester', 'name email')
    .sort({ updatedAt: -1 }).limit(100);
  return res.json({ tickets });
}

async function replyToTicket(req, res) {
  const body = clean(req.body.message, 3000);
  if (body.length < 2) return res.status(400).json({ message: 'Reply cannot be empty.' });
  const ticket = await SupportTicket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });
  ticket.replies.push({ author: 'support', body, sentAt: new Date() });
  ticket.status = 'awaiting_user';
  ticket.resolvedAt = null;
  await ticket.save();
  const requester = await User.findById(ticket.requester).select('email');
  if (requester?.email) {
    await sendCustomEmail(requester.email,
      'DDEI support reply — ' + ticket.number,
      'Your support request has a new reply:\n\n' + body +
      '\n\nLog in at https://ddei.online to view the ticket.').catch(() => {});
  }
  return res.json({ ticket });
}

async function replyAsLearner(req, res) {
  const body = clean(req.body.message, 3000);
  if (body.length < 2) return res.status(400).json({ message: 'Reply cannot be empty.' });
  const ticket = await SupportTicket.findOne({ _id: req.params.id, requester: req.userId });
  if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });
  ticket.replies.push({ author: 'learner', body, sentAt: new Date() });
  ticket.status = 'open';
  ticket.resolvedAt = null;
  await ticket.save();
  return res.json({ ticket });
}

async function changeTicketStatus(req, res) {
  const status = clean(req.body.status, 30);
  if (!STATUSES.has(status)) return res.status(400).json({ message: 'Invalid ticket status.' });
  const ticket = await SupportTicket.findByIdAndUpdate(req.params.id,
    { $set: { status, resolvedAt: status === 'resolved' ? new Date() : null } },
    { new: true, runValidators: true });
  if (!ticket) return res.status(404).json({ message: 'Ticket not found.' });
  return res.json({ ticket });
}

module.exports = { createTicket, listMyTickets, listAdminTickets, replyToTicket, replyAsLearner, changeTicketStatus };
