const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
  getDossiers,
  createDossier,
  uploadDocument
} = require('../controllers/dossierController');
const upload = require('../middlewares/upload');

const router = express.Router();

router
  .route('/')
  .get(protect, getDossiers)
  .post(protect, createDossier);

router
  .route('/:id/documents')
  .put(protect, upload.single('document'), uploadDocument);

module.exports = router;