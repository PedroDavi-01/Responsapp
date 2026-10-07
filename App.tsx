import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useWindowDimensions, useColorScheme,} from 'react-native';

// Objeto pra definir as cores de cada tema
const temas = {
  light: {
    fundo: '#f5f5f5',
    card: '#ffffff',
    texto: '#333333',
    subtexto: '#666666',
    primaria: '#007AFF',
    borda: '#dddddd',
  },
  dark: {
    fundo: '#121212',
    card: '#1E1E1E',
    texto: '#f5f5f5',
    subtexto: '#aaaaaa',
    primaria: '#0A84FF',
    borda: '#333333',
  },
};

export default function App() {
  // Usando o useColor pra ver qual preferência de tema do sistema
  const esquemaSistema = useColorScheme();

  // Tema manual e tema personalizável
  const [modoManual, setModoManual] = useState<boolean>(false);
  const [temaEscolha, setTemaEscolha] = useState<'light' | 'dark'>('light');

  const temaAtualKey = modoManual ? temaEscolha : (esquemaSistema || 'light');
  const t = temas[temaAtualKey];

  // Hook para pegar as dimensões da minha tela
  const { width, height } = useWindowDimensions();

  // Breakpoint pra definir que tipo de dispositivo é
  const ehTelaGrande = width >= 768;

  const alternarTema = () => {
    setModoManual(true);
    setTemaEscolha(temaAtualKey === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[estilos.container, { backgroundColor: t.fundo }]}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        
        {/* Header */}
        <View style={[estilos.card, { backgroundColor: t.card, borderColor: t.borda }]}>
          <Text style={[estilos.titulo, { color: t.texto }]}>Seminário Individual</Text>
          <Text style={[estilos.subtitulo, { color: t.subtexto }]}>
            Responsividade e Temas em React Native 
          </Text>

          {/*Button pra alterar o tema */}
          <Pressable 
            style={({ pressed }) => [
              estilos.botao, 
              { backgroundColor: t.primaria, opacity: pressed ? 0.7 : 1 }
            ]} 
            onPress={alternarTema}
          >
            <Text style={estilos.textoBotao}>
              Mudar Tema (Atual: {temaAtualKey.toUpperCase()})
            </Text>
          </Pressable>
        </View>

        {/* Cards pra metricas e breakpoint */}
        <View style={[estilos.card, { backgroundColor: t.card, borderColor: t.borda }]}>
          <Text style={[estilos.secaoTitulo, { color: t.texto }]}>Métricas Atuais</Text>
          
          <Text style={[estilos.textoInfo, { color: t.subtexto }]}>
            Largura: <Text style={{ color: t.texto, fontWeight: 'bold' }}>{width.toFixed(0)}px</Text>
          </Text>
          
          <Text style={[estilos.textoInfo, { color: t.subtexto }]}>
            Altura: <Text style={{ color: t.texto, fontWeight: 'bold' }}>{height.toFixed(0)}px</Text>
          </Text>

          <Text style={[estilos.textoInfo, { color: t.subtexto }]}>
            Breakpoint:{' '}
            <Text style={{ color: t.primaria, fontWeight: 'bold' }}>
              {ehTelaGrande ? '🖥️ Tela Grande (>= 768px)' : 'Mobile (< 768px)'}
            </Text>
          </Text>
        </View>

        {/* Grid responsivo */}
        <Text style={[estilos.secaoTitulo, { color: t.texto, marginTop: 10 }]}>
          Layout Adaptativo
        </Text>

        <View style={ehTelaGrande ? estilos.linhaGrid : estilos.colunaGrid}>
          
          <View style={[
            estilos.cardGrid, 
            { backgroundColor: t.card, borderColor: t.borda },
            ehTelaGrande ? { width: '48%' } : { width: '100%' }
          ]}>
            <Text style={[estilos.cardTitulo, { color: t.primaria }]}>Bloco 01</Text>
            <Text style={[estilos.textoDescricao, { color: t.subtexto }]}>
              Demonstração prática da mudança de tamanho de acordo com dispositivo usado.
            </Text>
          </View>

          <View style={[
            estilos.cardGrid, 
            { backgroundColor: t.card, borderColor: t.borda },
            ehTelaGrande ? { width: '48%' } : { width: '100%' }
          ]}>
            <Text style={[estilos.cardTitulo, { color: t.primaria }]}>Bloco 02</Text>
            <Text style={[estilos.textoDescricao, { color: t.subtexto }]}>
              Feito com componentes modernos.
            </Text>
          </View>

        </View>

      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingTop: 40, 
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    marginBottom: 14,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textoInfo: {
    fontSize: 14,
    marginBottom: 6,
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  linhaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colunaGrid: {
    flexDirection: 'column',
  },
  cardGrid: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  textoDescricao: {
    fontSize: 13,
    lineHeight: 18,
  },
});