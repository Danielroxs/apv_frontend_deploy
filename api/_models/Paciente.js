import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    propietario: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    sintomas: {
      type: String,
      required: true,
      trim: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Paciente ||
  mongoose.model("Paciente", pacienteSchema);
