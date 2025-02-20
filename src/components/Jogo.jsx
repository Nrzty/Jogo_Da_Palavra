import "./jogo.css";

import { useState, useRef } from "react";

export const Jogo = ({
  verificarLetra,
  palavraEscolhida,
  categoriaEscolhida,
  letras,
  letrasAdivinhadas,
  letrasErradas,
  chutes,
  pontuacao,
}) => {
  const [letra, setLetra] = useState("");
  const letraInserirReferencia = useRef(null);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    verificarLetra(letra);
    setLetra("");
    letraInserirReferencia.current.focus();
  };

  return (
    <div className="jogo">
      <p className="pontos">
        <span>Palavras Acertadas: {pontuacao}</span>
      </p>
      <h1>Adivinhe a Palavra:</h1>
      <h3 className="dica">
        Dica Sobre a Palavra: <span> {categoriaEscolhida} </span>
      </h3>
      <p>Você ainda tem {chutes} tentativas</p>
      <div className="containerDePalavra">
        {letras.map((letra, i) =>
          letrasAdivinhadas.includes(letra) ? (
            <span key={i} className="letra">
              {letra}
            </span>
          ) : (
            <span key={i} className="espacoEmBranco"></span>
          )
        )}
      </div>
      <div className="containerDaLetra">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letra"
            maxLength="1"
            required
            onChange={(evento) => setLetra(evento.target.value)}
            value={letra}
            ref={letraInserirReferencia}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="containerDasLetrasUsadas">
        <p>Letras Utilizadas: </p>
        {letrasErradas.map((letras, i) => (
          <span key={i}>{letras}</span>
        ))}
      </div>
    </div>
  );
};

export default Jogo;
