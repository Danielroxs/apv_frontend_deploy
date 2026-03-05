import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const veterinarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      default: "",
      trim: true,
    },
    web: {
      type: String,
      default: "",
      trim: true,
    },
    token: {
      type: String,
      default: "",
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

veterinarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

veterinarioSchema.methods.comprobarPassword = async function (
  passwordFormulario,
) {
  return bcrypt.compare(passwordFormulario, this.password);
};

export default mongoose.models.Veterinario ||
  mongoose.model("Veterinario", veterinarioSchema);
