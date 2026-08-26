import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const jogadores = [
  { id: '1', nome: 'jonas daniel de brito lopes', posicao: 'Goleiro', overall: 99 },
  { id: '2', nome: 'cucurrela', posicao: 'Lateral Direito', overall: 91 },
  { id: '3', nome: 'gustavo gomez', posicao: 'Zagueiro', overall: 87 },
  { id: '4', nome: 'gabriel maghalões', posicao: 'Zagueiro', overall: 88 },
  { id: '5', nome: 'nuno mendes', posicao: 'Lateral Esquerdo', overall: 90 },
  { id: '6', nome: 'bellingham', posicao: 'Volante', overall: 90 },
  { id: '7', nome: 'pedri', posicao: 'Meio-campo', overall: 89 },
  { id: '8', nome: 'lamine yamal', posicao: 'Ponta Direita', overall: 90 },
  { id: '9', nome: 'rodri', posicao: 'Meia', overall: 90 },
  { id: '10', nome: 'kylyan mbappe', posicao: 'Ponta Esquerda', overall: 91 },
  { id: '11', nome: 'Harry kane', posicao: 'Atacante', overall: 91 },
];

export default function Screen() {

const renderJogador = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.numero}>
        <Text style={styles.numeroTexto}>{item.id}</Text>
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
        11 jogadores cadastrados
      </Text>

      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id}
        renderItem={renderJogador}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  numero: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },

  numeroTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  informacoes: {
    flex: 1,
    marginLeft: 15,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  posicao: {
    fontSize: 14,
    color: '#777',
    marginTop: 3,
  },

  overall: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#eee',
  },

  overallTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});