import {useEffect, useState} from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "react-native-async-storage/async-storage"

const CHAVE_STORAGE =  "@time-app:jogadores"

export default function DetalhesJogadorScreen({route, navigation}) {
    const {id} = route.params

    const [jogador, setJogador] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [editando, setEditando] = useState(false)

    const [nome, setNome] = useState("")
    const [numero, setNumero] = useState("")
    const [posicao, setPosicao] = useState("")
    const [idade, setIdade] = useState("")
    const [gols, setGols] = useState("")
    const [observacoes, setObservacoes] = useState("")

    useEffect(() => {
        async function carregarJogador() {
            try {
                const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE)
                const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : []
                const encontrado = lista.find((j) => j.id === id)

                if (encontrado) {
                    setJogador(encontrado)
                    preencherFormulario(encontrado)
                }
            } catch (erro) {
                console.error("Erro ao carregar jogador", erro)
            } finally {
                setCarregando(false)
            }
        }
        carregarJogador()
    }, [id])
    
    function preencherFormulario(j) {
        setNome(j.nome)
        setNumero(String(j.numero))
        setPosicao(j.posicao)
        setIdade(String(j.idade))
        setGols(String(j.gols))
        setObservacoes(j.observacoes || "")
    }

    async function atualizarNoStorage(jogadorAtualizado) {
        const jogadoresSalvos = await  AsyncStorage.getItem(CHAVE_STORAGE)
        const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : []
        const novaLista = lista.map((j) =>
            j.id === id ? jogadorAtualizado: j,
        )
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista))
        return novaLista
    }

    async function salvarEdicao() {
        if (!nome.trim() ||  !posicao.trim()) return

        const jogadorAtualizado = {
            ...jogador,
            nome: nome.trim(),
            numero: Number(numero) || 0,
            posicao: posicao.trim(),
            idade: Number(idade) || 0,
            gols: Number(gols) || 0,
            observacoes: observacoes.trim(),
        }
        try {
            await atualizarNoStorage(jogadorAtualizado)
            setJogador(jogadorAtualizado)
            setEditando(false)
        } catch (erro){
            console.error("Erro ao salvar edição", erro)
        }
    }

    async function alternarStatus() {
        const jogadorAtualizado = {
            ...jogador,
            status: jogador.status === "titular" ? "reserva" : "titular"
        }  
        try {
            await atualizarNoStorage(jogadorAtualizado) 
            setJogador(jogadorAtualizado)       
        } catch (erro) {
            console.error("Erro ao alternar status", erro)
        }
    } 

    async function excluirJogador() {
        try{
            const jogadoresSalvos = await AsyncStorage.getItem(CHAVE_STORAGE)
            const lista = jogadoresSalvos ? JSON.parse(jogadoresSalvos) : []
            const novaLista = lista.filter((j) => j.id !== id)
            await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista))
            navigation.goBack()
        } catch (erro) {
            console.error("Erro ao excluir jogador", erro)
        }
    }
}