const express = require("express");
const router = express.Router();
const {
  getAllCandidates,
  getAllRecruiters,
} = require("../controllers/candidateController");

router.get("/", getAllCandidates);
router.get("/rec", getAllRecruiters);

module.exports = router;
