export interface Track {
  id: number;
  kmInicial?: number;
  kmFinal?: number;
  inicioDeslocamento?: string;
  checkList?: string;
  motivo?: string;
  observacao?: string;
  idCondutor?: number;
  idVeiculo?: number;
  idCliente?: number;
}
