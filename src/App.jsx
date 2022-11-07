import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Cyberpunk from './pages/cyberpunk';
import ExerciseRoom from './pages/exercise_room';
import Iotglove from './pages/iotglove';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exerciseroom" element={<ExerciseRoom />} />
      <Route path="/iotglove" element={<Iotglove />} />
      <Route path="/cyberpunk" element={<Cyberpunk />} />
    </Routes>
  );
};

export default App;
