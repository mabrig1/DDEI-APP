// Express 4 does not forward rejected promises from async route handlers to
// the error middleware — an unhandled rejection leaves the request hanging
// until the platform kills the connection (browser sees "Failed to fetch").
// Wrap async handlers so every rejection reaches errorHandler as JSON.
function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { asyncHandler };
