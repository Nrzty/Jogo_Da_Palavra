import "./TelaInicial.css";

export const TelaInicial = ({ comecarJogo }) => {
  return (
    <div className="start">
      <h1>Palavra Secreta</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={comecarJogo}>Começar o Jogo</button>
    </div>
  );
};

export default TelaInicial;
