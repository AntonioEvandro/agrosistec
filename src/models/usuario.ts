import mongoose,{Schema} from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome:  {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
},
senha: {
    type: String,
    required: true,
    minlength: 8,
},
animal: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animal'
    }
]
})

export = mongoose.model('usuario', usuarioSchema);