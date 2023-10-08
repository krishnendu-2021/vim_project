import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pass, salt);
    const newUser = new User({ ...req.body, pass: hash });

    await newUser.save();
    res.status(200).send("user has been created");
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(404).json({ resp: "please singup first" });

    const iscorrect = await bcrypt.compare(req.body.pass, user.pass);
    if (!iscorrect || req.body.email !== user.email)
      return res.status(404).json({ resp: "enter valid credentials" });

    const { pass, ...other } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(other);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send(user);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send(savedUser);
    }
  } catch (error) {}
};
