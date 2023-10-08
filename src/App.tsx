import Home from './components/home';
import { CommentsContextProvider } from './store/get-comments';

function App() {
  return (
    <CommentsContextProvider>
      <Home />
    </CommentsContextProvider>
  );
}

export default App;
