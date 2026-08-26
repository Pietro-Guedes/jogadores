import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Screen({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.icone}>⚽</Text>

      <Text style={styles.titulo}>MEU TIME</Text>

      <Text style={styles.subtitulo}>
        Gerencie seu elenco
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Jogadores')}
      >
        <Text style={styles.botaoTitulo}>👥 Jogadores</Text>
        <Text style={styles.botaoTexto}>
          Ver lista de jogadores
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.botaoTitulo}>➕ Novo jogador</Text>
        <Text style={styles.botaoTexto}>
          Cadastrar um novo atleta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Time')}
      >
        <Text style={styles.botaoTitulo}>🏆 Meu time</Text>
        <Text style={styles.botaoTexto}>
          Ver informações do time
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },

  icone: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },

  botao: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  botaoTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  botaoTexto: {
    color: '#777',
    marginTop: 5,
    fontSize: 14,
  },
});