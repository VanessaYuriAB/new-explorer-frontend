import './SearchTooltip.css';

function SearchTooltip() {
  return (
    <div className="search__tooltip">
      {/* Alterar 'Nome,' para variável contento o nome do usuário */}
      <h2 className="search__tooltip-title">Nome,</h2>
      <p className="search__tooltip-text">
        por favor, insira uma palavra-chave.
      </p>
    </div>
  );
}

export default SearchTooltip;
