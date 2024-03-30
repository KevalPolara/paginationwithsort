const express = require("express");
const {
  addUserData,
  getUserData,
  deleteUserData,
  editUserData,
  filterUserData,
} = require("../controller/userdata");
const router = express.Router();

router.post("/user/addData", addUserData);
router.get("/user/getData", getUserData);
router.delete("/user/deleteData/:id", deleteUserData);
router.put("/user/editData/:id", editUserData);

module.exports = router;
