import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  nome: {
      type: String,
      require: true,
  },
  raca: {
      type: String,
      require: true,
  },
  peso: {
      type: String,
      require: true,
  },
  datNasc: {
      type: String,
      require: true,
  },
  usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
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

const AnimalSchema = new Schema<Animal>({
    id: { type: Number, required: true},
    nome: { type: String, required: true },
    raca: { type: String, required: true },
    peso: { type: Number, required: true },
    medLeite: {type: Number, required: true },
    dataNasc: { type: Date, required: true},
    dataDes: {type: Date, required: true},
    sexo: {type: String, required: true },
    faixaEta: {type: String, required: true },
    status: {type: String, required: true }
  });
  
  export = mongoose.model('animal', Schema);
