import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function JogadorItem({
  jogador,
  aoAlternarStatus,
  aoExcluir,
  aoVerDetalhes,
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => aoVerDetalhes(jogador.id)}
    >
      <View style={styles.numeroContainer}>
        <Text style={styles.numero}>{jogador.numero}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{jogador.nome}</Text>
        <Text style={styles.posicao}>{jogador.posicao}</Text>
      </View>
      <View style={styles.direita}>
        <TouchableOpacity
        style={[
            styles.badgeStatus,
            jogador.status === 'titular' ? styles.badgeTitular : styles.badgeReserva,
        ]}
        onPress={() => aoAlternarStatus(jogador.id)}>
            <Text style={styles.textoBadge}>
                {jogador.status === 'titular' ? 'Titular' : 'Reserva'}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(jogador.id)}>
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  numeroContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2e86de',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numero: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  posicao: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  direita: {
    alignItems: 'flex-end',
    gap: 6,
  },
  badgeStatus: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeTitular: {
    backgroundColor: '#2ecc71',
  },
  badgeReserva: {
    backgroundColor: '#95a5a6',
  },
  textoBadge: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  botaoExcluir: {
    backgroundColor: '#e74c3c',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
});