import { string, z } from "zod";

export const createCarFormSchema = z.object({
  placa: z.string().nonempty("Campo obrigatório"),
  marcaModelo: z.string().nonempty("Campo obrigatório"),
  anoFabricacao: z.string().nonempty("Campo obrigatório"),
  kmAtual: z.string().nonempty("Campo obrigatório")
});

export const editCarFormSchema = z.object({
  marcaModelo: z.string().nonempty("Campo obrigatório"),
  anoFabricacao: z.string().nonempty("Campo obrigatório"),
  kmAtual: z.string().nonempty("Campo obrigatório")
});

export const createClientFormSchema = z.object({
  numeroDocumento: z.string().nonempty("Campo obrigatório"),
  tipoDocumento: z.string().nonempty("Campo obrigatório"),
  nome: z.string().nonempty("Campo obrigatório"),
  logradouro: z.string().nonempty("Campo obrigatório"),
  numero: z.string().nonempty("Campo obrigatório"),
  bairro: z.string().nonempty("Campo obrigatório"),
  cidade: z.string().nonempty("Campo obrigatório"),
  uf: z.string().nonempty("Campo obrigatório")
});

export const editClientFormSchema = z.object({
  tipoDocumento: z.string().nonempty("Campo obrigatório"),
  nome: z.string().nonempty("Campo obrigatório"),
  logradouro: z.string().nonempty("Campo obrigatório"),
  numero: z.string().nonempty("Campo obrigatório"),
  bairro: z.string().nonempty("Campo obrigatório"),
  cidade: z.string().nonempty("Campo obrigatório"),
  uf: z.string().nonempty("Campo obrigatório")
});

export const createConductorFormSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  numeroHabilitacao: z.string().nonempty("Campo obrigatório"),
  categoriaHabilitacao: z.string().nonempty("Campo obrigatório"),
  vencimentoHabilitacao: z.string().nonempty("Campo obrigatório")
});

export const editConductorFormSchema = z.object({
  vencimentoHabilitacao: z.string().nonempty("Campo obrigatório")
});

export const createTrackFormSchema = z.object({
  checklist: z.string().nonempty("Campo obrigatório"),
  motivo: z.string().nonempty("Campo obrigatório"),
  observacao: z.string().nonempty("Campo obrigatório"),
  idCondutor: z.string().nonempty("Campo obrigatório").min(1),
  idVeiculo: z.string().nonempty("Campo obrigatório").min(1),
  idCliente: z.string().nonempty("Campo obrigatório").min(1)
});

export const closeTrackFormSchema = z.object({
  kmFinal: z.string().nonempty("Campo obrigatório")
});
