const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
module.exports = function safeRouter() {
  const router = express.Router();
  for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
    const original = router[method].bind(router);
    router[method] = (path, ...handlers) => original(path, ...handlers.flat().map(asyncHandler));
  }
  return router;
};
