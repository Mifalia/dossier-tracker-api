const { User } = require('../models');
const Dossier = require('../models/Dossier');

// @desc    Get all dossiers
// @route   GET /api/v1/dossiers
exports.getDossiers = async (req, res, next) => {
  try {
    const { user } = req;

    const whereClause = user.role !== 'admin' ? { where: { createdBy: req.user.id } } : {};
    
    const dossiers = await Dossier.findAll({
      include: [
        {
          model: User,
          as: 'Creator',
          attributes: ['id', 'name', 'email'], // Select only these columns
        },
        {
          model: User,
          as: 'Assignee',
          attributes: ['id', 'name', 'email'], // Select only these columns
        },
      ],
      ...whereClause,
    });
    res.status(200).json({ success: true, count: dossiers.length, data: dossiers });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create dossier
// @route   POST /api/v1/dossiers
exports.createDossier = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const dossier = await Dossier.create(req.body);
    res.status(201).json({ success: true, data: dossier });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Upload document to dossier
// @route   PUT /api/v1/dossiers/:id/documents
exports.uploadDocument = async (req, res, next) => {
  try {
    const dossier = await Dossier.findById(req.params.id);

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    dossier.documents.push({
      name: req.file.originalname,
      url: req.file.path
    });

    await dossier.save();
    res.status(200).json({ success: true, data: dossier });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};