import NothingFound from '../NothingFound/NothingFound';
import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import './App.css';

function App() {
  return (
    <main className="page">
      <NothingFound />
      <Preloader />
      <About />
    </main>
  );
}

export default App;
