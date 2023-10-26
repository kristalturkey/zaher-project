import '../global.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StateContextProvider } from '@/functions/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyApp({ Component, pageProps }) {
  return <ChakraProvider>


<StateContextProvider>


  
  <Component {...pageProps} />
  <ToastContainer />
  </StateContextProvider>
  
  </ChakraProvider>
}
