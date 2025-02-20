import "./JogoAcabou.css";

export const JogoAcabou = ({ reiniciar, pontuacao }) => {
  return (
    <div>
      <h1>Fim do Jogo!</h1>
      <h2>
        Você acertou: <span>{pontuacao} palavras</span>
      </h2>
      <button onClick={reiniciar}>Reiniciar O Jogo</button>
    </div>
  );
};

export default JogoAcabou;
