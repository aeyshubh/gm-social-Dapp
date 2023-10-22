import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./contexts/WalletContext";
import { XmtpContextProvider } from "./contexts/XmtpContext";
import Home from "./pages/Home/Home"
import { Buffer } from "buffer";
import "./styles/styles.css"
import "./App.css";
import Chat from './pages/Chat/Chat'
import Header from "./components/Header/Header";

window.Buffer = Buffer;

function App() {
  return (
    <div className="App">
      <WalletContextProvider>
        <XmtpContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Chat" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </XmtpContextProvider>
      </WalletContextProvider>
    </div>
  );
}

export default App;
