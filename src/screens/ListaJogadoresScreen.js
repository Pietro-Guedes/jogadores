import { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { listarJogadores } from "../storage/jogadoresStorage";

export default function ListaJogadoresScreen() {
  const [jogadores, setJogadores] = useState([]);

  // Recarrega a lista sempre que a tela ganha foco (ex: voltando do Cadastro)
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const lista = await listarJogadores();
        setJogadores(lista);
      }
      carregar();
    }, []),
  );

  const renderJogador = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.numero}>
        <Text style={styles.numeroTexto}>{item.numero}</Text>
      </View>

      <View style={styles.informacoes}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.posicao}>{item.posicao}</Text>
      </View>

      <View style={styles.overall}>
        <Text style={styles.overallTexto}>{item.overall}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>⚽ Meu Time</Text>
      <Text style={styles.subtitulo}>
        {jogadores.length} jogador{jogadores.length !== 1 ? "es" : ""}{" "}
        cadastrado{jogadores.length !== 1 ? "s" : ""}
      </Text>

      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id}
        renderItem={renderJogador}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhum jogador cadastrado ainda.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  numero: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  numeroTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  informacoes: {
    flex: 1,
    marginLeft: 15,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  posicao: {
    fontSize: 14,
    color: "#777",
    marginTop: 3,
  },
  overall: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  overallTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listaVazia: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
});
