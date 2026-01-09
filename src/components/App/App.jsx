/* import Header from '../Header/Header';
import Main from '../Main/Main'; */
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../NothingFound/NothingFound';
import About from '../About/About';
import './App.css';

function App() {
  return (
    <div className="page">
      {/* <Header />
      <Main /> */}
      <SavedNewsHeader />
      <Preloader />
      <NothingFound />
      <About />
    </div>
  );
}

export default App;
