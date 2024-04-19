const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const middleware = require("../middleware/authenticateUser");
router.post("/signup", userController.user_signup);
router.post("/login",userController.user_login)
router.post("/delete_account",middleware.authenticateToken, userController.delete_account)
router.post("/signup_user", userController.signUpController);
router.post("/signin", userController.signInController);
router.post("/googleSignIn", userController.googleSignInController);
router.post("/facebookSignIn", userController.facebookSignInController);

// router.use(authenticateUser);

router.patch("/updateProfile/:userId", userController.updateUserProfileController);
// paAEjrFNY0dwvwOg balajiy798

module.exports = router;

