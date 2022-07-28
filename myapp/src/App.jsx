import Install from './components/Install';
import Home from './components/Home';
import Explore from './pages/explore';

function App() {
    if (window.ethereum) {
        return <Explore />
    } else {
        return <Install />
    }
}

export default App;