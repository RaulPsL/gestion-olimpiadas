import { Routes, Route } from 'react-router-dom';
import { AppSidebar } from './components/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './components/ui/sidebar';
import PageOlimpista from './pages/PageOlimpista';
import PageArea from './pages/PageArea';
import PageInterno from './pages/PageInterno';

function App() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="ml-auto px-3">
                        <h2>Gestion de olimpistas</h2>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Routes>
                        <Route path="*" element={<h1>Home</h1>} />
                        <Route path="/olimpistas" element={<PageOlimpista />} />
                        <Route path="/area" element={<PageArea />} />
                        <Route path="/usuarios_internos" element={<PageInterno />} />
                    </Routes>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default App;