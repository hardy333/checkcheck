import { Route, Routes } from "react-router-dom";
import Page1 from "./page1/Page1";
import Page2 from "./page2/Page2";
import Page3 from "./page3/Page3";
import Home from "./home/Home";
import Page0 from "./page0/Page0";
import Page4 from "./page4/Page4";
import Page5 from "./page5/Page5";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="page0" element={<Page0 />} />
        <Route path="page1" element={<Page1 />} />
        <Route path="page2" element={<Page2 />} />
        <Route path="page3" element={<Page3 />} />
        <Route path="page4" element={<Page4 />} />
        <Route path="page5" element={<Page5 />} />
      </Routes>
    </div>
  );
};

export default App;
