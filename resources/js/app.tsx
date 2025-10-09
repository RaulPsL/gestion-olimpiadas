import { Routes, Route } from 'react-router-dom';
import PageOlimpista from './pages/PageOlimpista';
import PageArea from './pages/PageArea';
import PageInterno from './pages/PageInterno';
import PageHome from './pages/PageHome';
import PageFase from './pages/PageFase';
import PageLogin from './pages/PageLogin';
import PageCalificaciones from './pages/PageCalificaciones';
import PageClasificaciones from './pages/PageClasificaciones';
import { AuthProvider } from './hooks/use-context';
import { PrivatRoute } from './hooks/use-private-route';

function App() {
    return (
        <div className="flex flex-1 flex-col gap-4 px-4">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/login" element={<PageLogin />} />
                    <Route
                        path="/olimpistas"
                        element={
                            <PrivatRoute
                                rol={['']}
                            >
                                <PageOlimpista />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/area"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageArea />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/administrar/encargado-de-area"
                        element={
                            <PrivatRoute
                                rol={['EDA']}
                            >
                                <PageInterno tipoUsuario='Encargado'/>
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/administrar/evaluador"
                        element={
                            <PrivatRoute
                                rol={['EDA']}
                            >
                                <PageInterno tipoUsuario='Evaluador'/>
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/calificaciones"
                        element={
                            <PrivatRoute
                                rol={['EVA']}
                            >
                                <PageCalificaciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/clasificaciones/areas"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageClasificaciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/fases"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageFase />
                            </PrivatRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;