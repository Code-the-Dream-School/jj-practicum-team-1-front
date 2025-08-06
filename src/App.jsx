import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import { getAllData } from './util/index'; // temporarily not needed

// const URL = 'http://localhost:8000/api/v1/';

function App() {
  // Temporarily disable this logic while we get routing working
  // const [message, setMessage] = useState(''); 

  // useEffect(() => {
  //   (async () => {
  //     const myData = await getAllData(URL);
  //     setMessage(myData.data);
  //   })();
  //   return () => {
  //     console.log('unmounting');
  //   };
  // }, []);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;