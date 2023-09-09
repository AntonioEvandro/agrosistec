import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nome: {
      type: String,
      require: true
  },
  raca: {
      type: String,
      require: true
  },
  peso: {
      type: Number,
      require: true
  },
  mediaLeite: {
    type: Number,
    require: true
  },
  datNasc: {
      type: Date,
      require: true
  },
  dataDes: {
    type: Date,
    required: true
  },
  sexo: {
    type: String, 
    required: true 
  },
  faixaEta: {
    type: String, 
    required: true 
  },
  status: {
    type: String, 
    required: true 
  },
  usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario'
  },
  evento: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'evento'
    }
  ],
  alimentacao: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alimentacao'
    }
  ],
  producao: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producao'
    }
  ]
})

export = mongoose.model('animal', Schema);
