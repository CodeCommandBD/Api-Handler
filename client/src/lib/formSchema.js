import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "কমপক্ষে ৩ অক্ষরের username দাও"),
  email: z.string().email("সঠিক email দাও"),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষরের password দাও"),
});

export const loginSchema = z.object({
  email: z.string().email("সঠিক email দাও"),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষরের password দাও"),
});

export const updateProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required to delete account"),
});
