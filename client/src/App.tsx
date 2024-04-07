import MedGas from "./pages/medgas/MedGas";
import MainHeader from "./components/ui/MainHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <MainHeader />
            <MedGas />
            <Toaster />
        </QueryClientProvider>
    );
}

export default App;
