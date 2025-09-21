import { Routes, Route } from 'react-router-dom';
import PageOlimpista from './pages/PageOlimpista';
import PageArea from './pages/PageArea';
import PageInterno from './pages/PageInterno';
import PageHome from './pages/PageHome';
import PageFase from './pages/PageFase';
import PageLogin from './pages/PageLogin';

function App() {
    return (
        <div className="flex flex-1 flex-col gap-4 px-4">
            <Routes>
                <Route path="/" element={<PageHome />} />
                <Route path="/login" element={<PageLogin />} />
                <Route path="/responsable" element={<PageOlimpista />} />
                <Route path="/area" element={<PageArea />} />
                <Route path="/administrar" element={<PageInterno />} />
                <Route path="/fase" element={<PageFase />} />
            </Routes>
        </div>
    );
}

export default App;