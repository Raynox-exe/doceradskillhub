const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  res.render("pages/index", { message: "Docerad SkillHub API is running..." });
});

module.exports = router;