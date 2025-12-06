const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');

// @route   GET api/admin/stats
// @desc    Get system statistics
// @access  Private/Admin
router.get('/stats', [auth, admin], async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const completedProfiles = await User.countDocuments({ role: 'student', profileCompleted: true });
    
    res.json({
      totalStudents,
      completedProfiles
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/students
// @desc    Get all students
// @access  Private/Admin
router.get('/students', [auth, admin], async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/student/:id
// @desc    Get student details
// @access  Private/Admin
router.get('/student/:id', [auth, admin], async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
