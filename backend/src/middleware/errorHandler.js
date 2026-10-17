const { securityEvent } = require('./security');
function notFound(req, res) { res.status(404).json({ message: 'Route not found' }); }
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  let status = Number.isInteger(err.status) && err.status >= 400 && err.status <= 599 ? err.status : 500;
  if (['CastError', 'ValidationError'].includes(err.name)) status = 400;
  securityEvent('request_error', req, { status });
  const message = status >= 500 ? 'Internal server error' :
    status === 413 ? 'Request body too large' : 'Invalid request';
  res.status(status).json({ message });
}
module.exports = { notFound, errorHandler };
