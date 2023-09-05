import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';

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

usuarioSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  });
  
  usuarioSchema.methods.compareSenha = async function (canditateSenha: any) {
    const isMatch = await bcrypt.compare(canditateSenha, this.senha);
    return isMatch;
  };

  // Método personalizado para ocultar a senha no retorno do JSON
usuarioSchema.methods.toJSON = function () {
    const usuarioObject = this.toObject();
    // Substitua o valor do campo "senha" por asteriscos antes de enviar a resposta
    usuarioObject.senha = '******';
    return usuarioObject;
};

export = mongoose.model('usuario', usuarioSchema);