import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      sub: user.publicId,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};