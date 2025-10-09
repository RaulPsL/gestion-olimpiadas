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
                    <Route path="/clasificaciones/areas" element={ <PageClasificaciones /> } />
                
                    <Route
                        path="/olimpistas/registrar olimpista(s)"
                        element={
                            <PrivatRoute
                            rol={['EDA']}
                            >
                                <PageOlimpista />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/olimpistas/ver olimpistas"
                        element={
                            <PrivatRoute
                                rol={['EDA', 'EVA']}
                            >
                                <PageArea />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/evaluadores/ver evaluadores"
                        element={
                            <PrivatRoute
                                rol={['EDA', 'EVA']}
                            >
                                <PageArea />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/ver areas"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageArea />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/ver fases"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageArea />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/crear area"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageArea />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/usuarios/crear-encargado"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageInterno tipoUsuario='Encargado'/>
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/usuarios/crear-evaluador"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
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
                        path="/calificaciones/olimpistas"
                        element={
                            <PrivatRoute
                                rol={['EVA']}
                            >
                                <PageClasificaciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/calificaciones/grupos"
                        element={
                            <PrivatRoute
                                rol={['EVA']}
                            >
                                <PageClasificaciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/acciones/evaluadores"
                        element={
                            <PrivatRoute
                                rol={['EDA']}
                            >
                                <PageClasificaciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/acciones/usuarios"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageClasificaciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/fases/preparacion de fase"
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