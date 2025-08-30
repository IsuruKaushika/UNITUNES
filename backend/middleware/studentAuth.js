import jwt from 'jsonwebtoken';

// ----- STUDENT AUTH -----
const authStudent = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "student") {
      return res.json({ success: false, message: "Not Authorized" });
    }

    req.user = decoded; // e.g. { id: studentId, role: "student" }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authStudent;
