import { Routes, Route } from 'react-router-dom';
import PageOlimpista from './pages/PageOlimpista';
import PageArea from './pages/PageArea';
import PageInterno from './pages/PageInterno';
import PageHome from './pages/PageHome';
import PageFase from './pages/PageFase';
import PageLogin from './pages/PageLogin';
import PageCalificaciones from './pages/PageCalificaciones';
import PageClasificaciones from './pages/PageClasificaciones';

function App() {
    return (
        <div className="flex flex-1 flex-col gap-4 px-4">
            <Routes>
                <Route path="/" element={<PageHome />} />
                <Route path="/login" element={<PageLogin />} />
                <Route path="/olimpistas" element={<PageOlimpista />} />
                <Route path="/area" element={<PageArea />} />
                <Route path="/administrar/encargado-de-area" element={<PageInterno tipoUsuario='Encargado'/>} />
                <Route path="/administrar/evaluador" element={<PageInterno tipoUsuario='Evaluador'/>} />
                <Route path="/calificaciones" element={<PageCalificaciones />} />
                <Route path="/clasificaciones/areas" element={<PageClasificaciones />} />
                <Route path="/fases" element={<PageFase />} />
            </Routes>
        </div>
    );
}

export default App;