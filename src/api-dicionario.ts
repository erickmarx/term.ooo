import axios from "axios";

export async function ApiDicionario(URI: string) {
  return await axios.get<{ word: string }>(
    `https://api.dicionario-aberto.net/${URI}`
  );
}
