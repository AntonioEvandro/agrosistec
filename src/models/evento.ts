import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nome: {
      type: String,
      require: true
  },
  veterinario: {
      type: String,
      require: true
  },
  valorVet: {
      type: Number,
      require: true
  },
  preoblema: {
    type: String,
    require: true
  },
  medicamento: {
      type: String,
      require: true
  },
  valorMedica: {
    type: Number,
    required: true
  },
  data: {
    type: Date, 
    required: true 
  },
  usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario'
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'animal'
  }
})

export = mongoose.model('evento', Schema);