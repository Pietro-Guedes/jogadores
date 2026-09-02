import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@time-app:jogadores";

export default function DetalhesJogadorScreen({ route, navigation }) {
  const { id } = route.params;

  const [jogador, setJogador] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(false);

  // Campos do formulário de edição
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [posicao, setPosicao] = useState("");
  const [idade, setIdade] = useState("");
  const [gols, setGols] = useState("");
  const [overall, setOverall] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    async function carregarJogador() {
      try {
        const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : [];
        const encontrado = lista.find((j) => j.id === id);

        if (encontrado) {
          setJogador(encontrado);
          preencherFormulario(encontrado);
        }
      } catch (erro) {
        console.error("Erro ao carregar jogador", erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarJogador();
  }, [id]);

  function preencherFormulario(j) {
    setNome(j.nome);
    setNumero(String(j.numero));
    setPosicao(j.posicao);
    setIdade(String(j.idade));
    setGols(String(j.gols));
    setOverall(String(j.overall ?? ""));
    setObservacoes(j.observacoes || "");
  }

  async function atualizarNoStorage(jogadorAtualizado) {
    const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
    const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : [];
    const novaLista = lista.map((j) => (j.id === id ? jogadorAtualizado : j));
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
    return novaLista;
  }

  async function salvarEdicao() {
    if (!nome.trim() || !posicao.trim()) return;

    const jogadorAtualizado = {
      ...jogador,
      nome: nome.trim(),
      numero: Number(numero) || 0,
      posicao: posicao.trim(),
      idade: Number(idade) || 0,
      gols: Number(gols) || 0,
      overall: Number(overall) || 0,
      observacoes: observacoes.trim(),
    };

    try {
      await atualizarNoStorage(jogadorAtualizado);
      setJogador(jogadorAtualizado);
      setEditando(false);
    } catch (erro) {
      console.error("Erro ao salvar edição", erro);
    }
  }

  async function alternarStatus() {
    const jogadorAtualizado = {
      ...jogador,
      status: jogador.status === "titular" ? "reserva" : "titular",
    };

    try {
      await atualizarNoStorage(jogadorAtualizado);
      setJogador(jogadorAtualizado);
    } catch (erro) {
      console.error("Erro ao alternar status", erro);
    }
  }

  async function excluirJogador() {
    try {
      const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
      const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : [];
      const novaLista = lista.filter((j) => j.id !== id);
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
      navigation.goBack();
    } catch (erro) {
      console.error("Erro ao excluir jogador", erro);
    }
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!jogador) {
    return (
      <View style={styles.container}>
        <Text>Jogador não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {editando ? (
        <>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Posição</Text>
          <TextInput
            style={styles.input}
            value={posicao}
            onChangeText={setPosicao}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Gols</Text>
          <TextInput
            style={styles.input}
            value={gols}
            onChangeText={setGols}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Overall</Text>
          <TextInput
            style={styles.input}
            value={overall}
            onChangeText={setOverall}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
          />

          <View style={styles.botoesEdicao}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={() => {
                preencherFormulario(jogador);
                setEditando(false);
              }}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoSalvar]}
              onPress={salvarEdicao}
            >
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.cabecalho}>
            <View style={styles.numeroContainer}>
              <Text style={styles.numero}>{jogador.numero}</Text>
            </View>
            <View>
              <Text style={styles.nomeJogador}>{jogador.nome}</Text>
              <Text style={styles.posicaoJogador}>{jogador.posicao}</Text>
            </View>
          </View>

          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Idade</Text>
            <Text style={styles.infoValor}>{jogador.idade} anos</Text>
          </View>

          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Gols</Text>
            <Text style={styles.infoValor}>{jogador.gols}</Text>
          </View>

          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Overall</Text>
            <Text style={styles.infoValor}>{jogador.overall}</Text>
          </View>

          <View style={styles.infoLinha}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={styles.infoValor}>
              {jogador.status === "titular" ? "Titular" : "Reserva"}
            </Text>
          </View>

          {jogador.observacoes ? (
            <View style={styles.infoLinha}>
              <Text style={styles.infoLabel}>Observações</Text>
              <Text style={styles.infoValor}>{jogador.observacoes}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.botao,
              jogador.status === "titular"
                ? styles.botaoReserva
                : styles.botaoTitular,
            ]}
            onPress={alternarStatus}
          >
            <Text style={styles.textoBotao}>
              {jogador.status === "titular"
                ? "Mover para Reserva"
                : "Mover para Titular"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoEditar]}
            onPress={() => setEditando(true)}
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoExcluir]}
            onPress={excluirJogador}
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  conteudo: {
    padding: 20,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  numeroContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2e86de",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  numero: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  nomeJogador: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  posicaoJogador: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  infoLinha: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  infoValor: {
    fontSize: 16,
    color: "#222",
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: "top",
  },
  botoesEdicao: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  botaoCancelar: {
    backgroundColor: "#ccc",
    flex: 1,
  },
  botaoSalvar: {
    backgroundColor: "#2ecc71",
    flex: 1,
  },
  botaoEditar: {
    backgroundColor: "#3498db",
  },
  botaoExcluir: {
    backgroundColor: "#e74c3c",
  },
  botaoTitular: {
    backgroundColor: "#2ecc71",
  },
  botaoReserva: {
    backgroundColor: "#95a5a6",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
