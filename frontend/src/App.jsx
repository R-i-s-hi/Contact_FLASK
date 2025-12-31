import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/home'


function App() {

  return (
    <>
      <div style={{backgroundColor: '#f2f2f2'}}>
        <Home />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
    </>
  )
}

export default App
