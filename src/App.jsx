// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Signin from './auth/signin'
// import Signup from './auth/signup'
// import QuestionTogglePage from './pages/questions'
// function App() {


//   return (
//     <BrowserRouter>
//       <Routes>
//           <Route path='/signup' element={<Signup />}></Route>
//           <Route path='/signin' element={<Signin/>}></Route>
//           <Route path='/questions' element={QuestionTogglePage}></Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App



import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './auth/signin'
import Signup from './auth/signup'
import QuestionTogglePage from './pages/questions'
import DigitalChotaCopPage from './pages/homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DigitalChotaCopPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/questions' element={<QuestionTogglePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
