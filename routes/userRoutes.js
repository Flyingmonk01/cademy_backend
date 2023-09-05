import express from "express";
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateUserRole, updateprofilepicture } from "../controllers/userControllers.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js"


const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get Profile
router.route("/me").get(isAuthenticated, getMyProfile);


// Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// ChangePassword
router.route("/changepassword").put(isAuthenticated, changePassword);


// UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);


// Update profile picture
router.route("/updateprofilepicture").put(singleUpload, isAuthenticated, updateprofilepicture);


// ForgetPassword
router.route("/forgetpassword").post(forgetPassword);



// ResetPassword
router.route("/resetpassword/:token").put(resetPassword);



// AddtoPlaylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);



// RemoveFromPlaylist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);



// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);


router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;

