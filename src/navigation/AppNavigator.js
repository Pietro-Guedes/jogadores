import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioScreen from "../screens/InicioScreen";
import ListaJogadoresScreen from "../screens/ListaJogadoresScreen";
import CadastroJogadorScreen from "../screens/CadastroJogadorScreen";
import DetalhesJogadorScreen from "../screens/DetalhesJogadorScreen";
import EscalacaoScreen from "../screens/EscalacaoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Jogadores"
          component={ListaJogadoresScreen}
          options={{ title: "Jogadores" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroJogadorScreen}
          options={{ title: "Novo Jogador" }}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesJogadorScreen}
          options={{ title: "Detalhes do Jogador" }}
        />
        <Stack.Screen
          name="Time"
          component={EscalacaoScreen}
          options={{ title: "Meu Time" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
