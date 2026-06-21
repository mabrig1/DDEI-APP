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
const { requireAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.get('/admin/all', requireAdmin, listAdmin);
router.get('/admin/:id', requireAdmin, getAdminById);
router.post('/admin', requireAdmin, createContent);
router.patch('/admin/:id', requireAdmin, updateContent);
router.delete('/admin/:id', requireAdmin, deleteContent);

router.get('/', listPublic);
router.get('/:slug', getPublicBySlug);

module.exports = router;
