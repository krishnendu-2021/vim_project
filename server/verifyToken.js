import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(404).send("Please do signin again");

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(404).send("YOU ARE NOT AUTHENTICATED");

    req.user = user;
    next();
  });
};
