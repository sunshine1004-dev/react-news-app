import './App.css'
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material'; 
import { Provider } from 'react-redux';
import router from '@/router';
import store from '@/redux';

const theme = createTheme();

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
