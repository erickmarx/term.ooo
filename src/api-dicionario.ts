import axios, { AxiosResponse } from "axios";

export async function ApiDicionario<T>(
  URI: string
): Promise<AxiosResponse<T, any>> {
  return await axios.get<T>(`https://api.dicionario-aberto.net/${URI}`);
}
