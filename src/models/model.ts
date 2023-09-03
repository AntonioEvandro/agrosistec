import mongoose,{Schema} from 'mongoose';

interface Evento {
  id: any,
  nome: string,
  veterinario: string,
  valor: number,
  problema: string,
  medicamento: string,
  valorMedica: number,
  data: Date
}

interface Alimentacao {
  id: any,
  tipo: string,
  regime: string,
  quantidade: number,
  data: Date
}

interface ProdLeite {
  id: any,
  primeira_ordenha: number,
  segunda_ordenha: number,
  date_registro: Date
}

interface Animal extends Document{
  id: any,
  nome: string,
  raca: string,
  peso: number,
  medLeite: number,
  dataNasc: Date,
  dataDes: Date,
  sexo: string,
  faixaEta: string,
  status: string,
  evenVet: Evento[],
  alimentacao: Alimentacao[],
  prodLeite: ProdLeite[]
}

interface Usuario extends Document{
  id:any,
  name: string,
  email: string,
  senha: string,
  animal: Animal[]
};
  // se não funcionar tente colocar o AnimalSchema de animal.ts aqui e coloque o tipo aqui em baixo no lugar de animal:[...]
const UsuarioSchema = new Schema<Usuario>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    email: {type: String, required: true },
    senha: {type: String, required:  true },
    animal: {
      type: [
        {
          type: Schema.Types.Mixed
        }
      ] as any, default: [] 
    }
  });

  const usuario = mongoose.model<Usuario>('Usuario', UsuarioSchema);
  
  export default usuario;