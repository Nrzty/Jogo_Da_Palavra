// CSS
import "./App.css";

// COMPONENTES
import { TelaInicial } from "./components/TelaInicial";
import { Jogo } from "./components/Jogo";
import { JogoAcabou } from "./components/JogoAcabou";

// REACT
import { useCallback, useEffect, useState } from "react";

// DATA
import { ListaDePalavras } from "./data/Palavras";

const estagios = [
  { id: 1, name: "comecar" },
  { id: 2, name: "jogo" },
  { id: 3, name: "acabar" },
];

const quantidadeDeChutes = 5;

function App() {
  const [estagioDoJogo, setEstagioDoJogo] = useState(estagios[0].name);
  const [palavras] = useState(ListaDePalavras);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]);
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [chutes, setChutes] = useState(quantidadeDeChutes);
  const [pontuacao, setPontuacao] = useState(0);

  const pegaUmaPalavraESuaCategoria = useCallback(() => {
    const categorias = Object.keys(palavras);
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
    const palavra =
      palavras[categoria][
        Math.floor(Math.random() * palavras[categoria].length)
      ];
    return { palavra, categoria };
  }, [palavras]);

  const comecarJogo = useCallback(() => {
    limparEstadosDasLetras();
    const { palavra, categoria } = pegaUmaPalavraESuaCategoria();
    setPalavraEscolhida(palavra);
    setCategoriaEscolhida(categoria);
    setLetras(palavra.toLowerCase().split(""));
    setEstagioDoJogo(estagios[1].name);
  }, [pegaUmaPalavraESuaCategoria]);

  const verificarLetra = (letra) => {
    const normalizarLetra = letra.toLowerCase();
    if (
      letrasAdivinhadas.includes(normalizarLetra) ||
      letrasErradas.includes(normalizarLetra)
    ) {
      return;
    }
    if (letras.includes(normalizarLetra)) {
      setLetrasAdivinhadas((atual) => [...atual, normalizarLetra]);
    } else {
      setLetrasErradas((atual) => [...atual, normalizarLetra]);
      setChutes((chutesAtuais) => chutesAtuais - 1);
    }
  };

  const limparEstadosDasLetras = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  };

  useEffect(() => {
    if (chutes <= 0) {
      limparEstadosDasLetras();
      setEstagioDoJogo(estagios[2].name);
    }
  }, [chutes]);

  useEffect(() => {
    const letrasUnicas = [...new Set(letras)];
    if (
      letrasAdivinhadas.length === letrasUnicas.length &&
      letrasUnicas.length > 0
    ) {
      setPontuacao((pontuacaoAtual) => pontuacaoAtual + 1);
      comecarJogo();
    }
  }, [letrasAdivinhadas, letras, comecarJogo]);

  const reiniciarJogo = () => {
    setPontuacao(0);
    setChutes(quantidadeDeChutes);
    setEstagioDoJogo(estagios[0].name);
  };

  return (
    <div className="App">
      {estagioDoJogo === "comecar" && <TelaInicial comecarJogo={comecarJogo} />}
      {estagioDoJogo === "jogo" && (
        <Jogo
          verificarLetra={verificarLetra}
          palavraEscolhida={palavraEscolhida}
          categoriaEscolhida={categoriaEscolhida}
          letras={letras}
          letrasAdivinhadas={letrasAdivinhadas}
          letrasErradas={letrasErradas}
          chutes={chutes}
          pontuacao={pontuacao}
        />
      )}
      {estagioDoJogo === "acabar" && (
        <JogoAcabou reiniciar={reiniciarJogo} pontuacao={pontuacao} />
      )}
    </div>
  );
}

export default App;
