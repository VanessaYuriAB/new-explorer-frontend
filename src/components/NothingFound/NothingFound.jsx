import nothingFound from '../../assets/not-found.svg';
import './NothingFound.css';

function NothingFound() {
  return (
    <section className="nothing-found">
      <img
        className="nothing-found__image"
        src={nothingFound}
        alt="Desenho de uma lupa com carinha triste."
      />
      <h2 className="nothing-found__title">Nada encontrado</h2>
      <p className="nothing-found__text">
        Desculpe, mas nada corresponde aos seus termos de pesquisa.
      </p>
    </section>
  );
}

export default NothingFound;
