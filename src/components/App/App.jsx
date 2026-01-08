import NothingFound from '../NothingFound/NothingFound';
import Preloader from '../Preloader/Preloader';
import About from '../About/About';
import './App.css';

function App() {
  return (
    <div className="page">
      <NothingFound />
      <Preloader />
      <About />
    </div>
  );
}

export default App;
