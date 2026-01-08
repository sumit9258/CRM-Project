import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false, // 🔐 never return password
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    ProfilePicture: {
      type: String,
      default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
