import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  tipo: {
      type: String,
      require: true
  },
  regime: {
      type: String,
      require: true
  },
  quantidade: {
      type: Number,
      require: true
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