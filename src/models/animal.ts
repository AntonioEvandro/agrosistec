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
    status: {type: String, required: true },
    evenVet: { 
      type: [
        { 
          type: Schema.Types.Mixed 
        }
      ] as any, default: []
    },
    alimentacao: { 
      type: [
        { 
          type: Schema.Types.Mixed 
        }
      ] as any, default: []
    },
    prodLeite: { 
        type: [
          { 
            type: Schema.Types.Mixed 
          }
        ] as any, default: []
    }

  });
  
  const animal = mongoose.model<Animal>('animal', AnimalSchema);
  
  export default animal;
