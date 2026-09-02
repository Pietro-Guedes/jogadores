import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@time-app:jogadores";

export async function listarJogadores() {
  try {
    const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
    return jogadoresSalvos ? JSON.parse(jogadoresSalvos) : [];
  } catch (erro) {
    console.error("Erro ao listar jogadores", erro);
    return [];
  }
}

export async function buscarJogadorPorId(id) {
  const lista = await listarJogadores();
  return lista.find((jogador) => jogador.id === id) || null;
}

export async function adicionarJogador(novoJogador) {
  const lista = await listarJogadores();
  const novaLista = [...lista, novoJogador];
  await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
  return novaLista;
}

export async function atualizarJogador(id, dadosAtualizados) {
  const lista = await listarJogadores();
  const novaLista = lista.map((jogador) =>
    jogador.id === id ? { ...jogador, ...dadosAtualizados } : jogador,
  );
  await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
  return novaLista;
}

export async function removerJogador(id) {
  const lista = await listarJogadores();
  const novaLista = lista.filter((jogador) => jogador.id !== id);
  await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
  return novaLista;
}

export async function limparJogadores() {
  await AsyncStorage.removeItem(CHAVE_STORAGE);
}
