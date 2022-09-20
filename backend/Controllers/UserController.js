exports.getUserAuthStatus = (req, res) => {
    if (req.session.user) {
      return res.status(200).json({
        auth: true,
      });
    }
    res.json({ auth: false });
  };