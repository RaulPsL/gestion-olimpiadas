import { Routes, Route } from 'react-router-dom';
import PageOlimpista from './pages/PageCrearOlimpista';
import PageArea from './pages/PageVerUsuarios';
import PageInterno from './pages/PageInterno';
import PageHome from './pages/PageHome';
import PageLogin from './pages/PageLogin';
import PageCalificaciones from './pages/PageCalificaciones';
import PageClasificaciones from './pages/PageClasificaciones';
import { AuthProvider } from './hooks/use-context';
import { PrivatRoute } from './hooks/use-private-route';
import PageVerOlimpistas from './pages/PageVerOlimpistas';
import PageVerAreas from './pages/PageVerAreas';
import PageVerFases from './pages/PageverFases';
import PageCrearFase from './pages/PageCrearFase';
import PageVerAcciones from './pages/PageVerAcciones';
import PageCierreFases from './pages/PageCierreFases';
import PageGenerarDocs from './pages/PageDocument';
import PageVerUsuarios from './pages/PageVerUsuarios';

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
                        path="/olimpistas/registrar grupo(s)"
                        element={
                            <PrivatRoute
                            rol={['EDA']}
                            >
                                <PageOlimpista grupo={true}/>
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/olimpistas/ver olimpistas"
                        element={
                            <PrivatRoute
                                rol={['EDA', 'EVA', 'ADM']}
                            >
                                <PageVerOlimpistas />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/evaluadores/ver evaluadores"
                        element={
                            <PrivatRoute
                                rol={['EDA', 'EVA']}
                            >
                                <PageVerUsuarios />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/ver usuarios"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageVerUsuarios />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/ver areas"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA', 'ADM']}
                            >
                                <PageVerAreas />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/ver fases"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA', 'ADM']}
                            >
                                <PageVerFases />
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
                        path="/calificaciones/olimpistas"
                        element={
                            <PrivatRoute
                                rol={['EVA']}
                            >
                                <PageCalificaciones esGrupo={false}/>
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/calificaciones/grupos"
                        element={
                            <PrivatRoute
                                rol={['EVA']}
                            >
                                <PageCalificaciones esGrupo={true}/>
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/acciones/evaluadores"
                        element={
                            <PrivatRoute
                                rol={['EDA']}
                            >
                                <PageVerAcciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/acciones/usuarios"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageVerAcciones />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/areas/fases/preparacion de fase"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageCrearFase />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/fases/cierre de fase"
                        element={
                            <PrivatRoute
                                rol={['EVA', 'EDA']}
                            >
                                <PageCierreFases />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/fases/ver cierres"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageCierreFases />
                            </PrivatRoute>
                        }
                    />
                    <Route
                        path="/reportes/generar"
                        element={
                            <PrivatRoute
                                rol={['ADM']}
                            >
                                <PageGenerarDocs />
                            </PrivatRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;