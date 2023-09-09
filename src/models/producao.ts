import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  primOrdenha: {
    type: Number,
    require: true
  },
  segOrdenha: {
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

export = mongoose.model('producao', Schema);