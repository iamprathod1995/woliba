import logo from './logo.svg';
import './App.css';
import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from './routes/AppRoutes';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';

function App() {
  return (
    <div className="App">
       <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                window.location.reload();
            }}
        >
          <AppRoutes />
        </ErrorBoundary>
       
    </div>
  );
}

export default App;
