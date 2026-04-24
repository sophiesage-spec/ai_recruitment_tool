import { Request, Response } from "express";
import { User } from "../models/user.model.js";

// ─── Register ─────────────────────────────────────────────────────────────────

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: "All fields are required." });
      return;
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({ success: false, message: "Email is already registered." });
      return;
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: (error as Error).message,
    });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid password." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: (error as Error).message,
    });
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body as { email: string };

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: (error as Error).message,
    });
  }
};
