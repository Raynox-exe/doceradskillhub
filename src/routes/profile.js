const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, 'user-' + req.user.id + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images and PDFs Only!');
    }
  }
});

// @route   PUT api/profile/update
// @desc    Update user profile
// @access  Private
router.put('/update', [auth, upload.fields([{ name: 'passport', maxCount: 1 }, { name: 'nin_document', maxCount: 1 }])], async (req, res) => {
  const {
    fullname,
    dob, gender, marital_status, nationality, state_origin, lga,
    nin_number,
    address, city, state_residence, nok_name, nok_phone, nok_address,
    qualification, employment, program, experience,
    ref_name, ref_relationship, ref_phone, ref_email
  } = req.body;

  // Build profile object
  const profileFields = {};
  if (fullname) profileFields.fullname = fullname;
  if (dob) profileFields.dob = dob;
  if (gender) profileFields.gender = gender;
  if (marital_status) profileFields.marital_status = marital_status;
  if (nationality) profileFields.nationality = nationality;
  if (state_origin) profileFields.state_origin = state_origin;
  if (lga) profileFields.lga = lga;
  if (nin_number) profileFields.nin_number = nin_number;
  
  // Handle File Uploads
  if (req.files) {
    if (req.files.passport) {
      profileFields.passport_url = req.files.passport[0].path;
    }
    if (req.files.nin_document) {
      profileFields.nin_document_url = req.files.nin_document[0].path;
    }
  }
  
  if (address) profileFields.address = address;
  if (city) profileFields.city = city;
  if (state_residence) profileFields.state_residence = state_residence;
  if (nok_name) profileFields.nok_name = nok_name;
  if (nok_phone) profileFields.nok_phone = nok_phone;
  if (nok_address) profileFields.nok_address = nok_address;
  
  if (qualification) profileFields.qualification = qualification;
  if (employment) profileFields.employment_status = employment;
  if (program) profileFields.program_interest = program;
  if (experience) profileFields.experience_level = experience;
  
  if (ref_name) profileFields.ref_name = ref_name;
  if (ref_relationship) profileFields.ref_relationship = ref_relationship;
  if (ref_phone) profileFields.ref_phone = ref_phone;
  if (ref_email) profileFields.ref_email = ref_email;

  profileFields.profileCompleted = true;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
