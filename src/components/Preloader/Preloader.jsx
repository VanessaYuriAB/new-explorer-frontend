import './Preloader.css';

export default function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__circle"></div>
      <p className="preloader__text">Procurando notícias...</p>
    </section>
  );
}
