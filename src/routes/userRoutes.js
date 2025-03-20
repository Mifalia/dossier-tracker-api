// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { getUsers } = require('../controllers/userController'); // Import correct

router.get('/', protect, authorize('admin'), getUsers);

module.exports = router;