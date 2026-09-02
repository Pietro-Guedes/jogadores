import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "@time-app:jogadores";

export default function CadastroJogadorScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [posicao, setPosicao] = useState("");
  const [idade, setIdade] = useState("");
  const [status, setStatus] = useState("reserva"); // 'titular' | 'reserva'
  const [gols, setGols] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [overall, setOverall] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  function validar() {
    if (!nome.trim()) return "Informe o nome do jogador.";
    if (!numero.trim() || isNaN(Number(numero)))
      return "Informe um número válido.";
    if (!posicao.trim()) return "Informe a posição.";
    if (!idade.trim() || isNaN(Number(idade)))
      return "Informe uma idade válida.";
    return "";
  }

  async function cadastrarJogador() {
    const mensagemErro = validar();
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }
    setErro("");
    setSalvando(true);

    const novoJogador = {
      id: Date.now().toString(),
      nome: nome.trim(),
      numero: Number(numero),
      posicao: posicao.trim(),
      idade: Number(idade),
      status,
      gols: Number(gols) || 0,
      overall: Number(overall),
      observacoes: observacoes.trim(),
    };

    try {
      const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
      const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : [];
      const novaLista = [...lista, novoJogador];
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));

      limparFormulario();
      navigation.goBack();
    } catch (erroSalvar) {
      console.error("Erro ao cadastrar jogador", erroSalvar);
      setErro("Não foi possível salvar o jogador. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  if (
    !overall.trim() ||
    isNaN(Number(overall)) ||
    Number(overall) < 0 ||
    Number(overall) > 99
  )
    return "Informe um overall entre 0 e 99.";

  function limparFormulario() {
    setNome("");
    setNumero("");
    setPosicao("");
    setIdade("");
    setStatus("reserva");
    setGols("");
    setOverall("");
    setObservacoes("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Cadastrar Jogador</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: João Silva"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Número da camisa</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 10"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Posição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Atacante"
          value={posicao}
          onChangeText={setPosicao}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 24"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gols (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 0"
          value={gols}
          onChangeText={setGols}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Overall</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 85"
          value={overall}
          onChangeText={setOverall}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[
              styles.statusBotao,
              status === "titular" && styles.statusBotaoAtivoTitular,
            ]}
            onPress={() => setStatus("titular")}
          >
            <Text
              style={[
                styles.statusTexto,
                status === "titular" && styles.statusTextoAtivo,
              ]}
            >
              Titular
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statusBotao,
              status === "reserva" && styles.statusBotaoAtivoReserva,
            ]}
            onPress={() => setStatus("reserva")}
          >
            <Text
              style={[
                styles.statusTexto,
                status === "reserva" && styles.statusTextoAtivo,
              ]}
            >
              Reserva
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Observações (opcional)</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Alguma observação sobre o jogador..."
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.botaoCadastrar, salvando && styles.botaoDesabilitado]}
          onPress={cadastrarJogador}
          disabled={salvando}
        >
          <Text style={styles.textoBotaoCadastrar}>
            {salvando ? "Salvando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
  },
  statusBotao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  statusBotaoAtivoTitular: {
    backgroundColor: "#2ecc71",
    borderColor: "#2ecc71",
  },
  statusBotaoAtivoReserva: {
    backgroundColor: "#95a5a6",
    borderColor: "#95a5a6",
  },
  statusTexto: {
    color: "#555",
    fontWeight: "600",
  },
  statusTextoAtivo: {
    color: "#fff",
  },
  erro: {
    color: "#e74c3c",
    marginTop: 12,
    fontSize: 13,
  },
  botaoCadastrar: {
    backgroundColor: "#2e86de",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotaoCadastrar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
