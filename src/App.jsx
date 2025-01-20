import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Quiz from './Pages/Quiz';
import StartQuiz from './Pages/StartQuiz';
import ScoreQuiz from './Pages/ScoreQuiz';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route index element={<StartQuiz />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="result" element={<ScoreQuiz />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;