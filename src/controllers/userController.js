export const getUser = async (req, res) => {
  if (req.userData) {
    return res.status(200).json({ user: req.userData });
  }

  return res.status(200).json({ message: 'No user here!!' });
};
