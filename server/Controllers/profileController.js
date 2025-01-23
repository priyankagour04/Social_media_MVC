

export const createProfile = async (req, res) => {
    try {
    } catch (error) {}
  };
  
  export const updateProfile = async (req, res) => {
    try {
    } catch (error) {}
  };
  
  export const getUserProfile = async (req, res) => {
    try {
    } catch (error) {}
  };
  
  // Get a specific user's profile data
  export const getSpecificUserProfile = async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await userModel.findOne({ username }).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user profile" });
    }
  };