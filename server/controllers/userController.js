const getAllUsers = (req, res) => {
  res.send("All users fetched");
};

const signUp = (req, res) => {
  res.send("Signing up");
};

const logIn = (req, res) => {
  res.send("Logging in");
};

const getUserProfile = (req, res) => {
  res.send("Profile fetched");
};

const updateUserProfile = (req, res) => {
  res.send("Profile updated");
};

const deleteUserProfile = (req, res) => {
  res.send("Profile deleted");
};

export default {
  getAllUsers,
  signUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
