const express = require('express');
const {
  listPublic,
  getPublicBySlug,
  listAdmin,
  getAdminById,
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/contentController');
const { requireContentWriteAccess } = require('../middleware/contentAccess');

const router = express.Router();

router.get('/admin/all', requireContentWriteAccess, listAdmin);
router.get('/admin/:id', requireContentWriteAccess, getAdminById);
router.post('/admin', requireContentWriteAccess, createContent);
router.patch('/admin/:id', requireContentWriteAccess, updateContent);
router.delete('/admin/:id', requireContentWriteAccess, deleteContent);

router.get('/', listPublic);
router.get('/:slug', getPublicBySlug);

module.exports = router;
