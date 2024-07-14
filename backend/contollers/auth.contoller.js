import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const test = (req, res) => {
  res.send("Hello World");
};
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const { password, ...userInfo } = user._doc;
      res.status(200).json({ userInfo, token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
