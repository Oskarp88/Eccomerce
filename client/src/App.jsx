import toast, { Toaster } from 'react-hot-toast';
import Navigation from './pages/auth/Navigation';
import { Outlet } from 'react-router-dom';

function App() {

  return (
   <>
     <Toaster/>
     <Navigation />
     <main className='py-3'>
       <Outlet/>
     </main>
   </>
  )
}

export default App
