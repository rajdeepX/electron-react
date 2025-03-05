import PdfViewer from "./components/PdfViewer";
import { pdfjs } from "react-pdf";
import BillComponent from "./components/BillComponent";
import { useState } from "react";



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


function App() {
  const [activeTask, setActiveTask] = useState(null);
  return (
    <div className="main-container">
      
      <div className="app-container">
      
      <button className="home-button" onClick={() => setActiveTask(null)}>
        Home
      </button>

      
      {activeTask === null && (
        <div className="task-buttons">
          <button className="task-btn" onClick={() => setActiveTask("task1")}>Task 1</button>
          <button className="task-btn" onClick={() => setActiveTask("task2")}>Task 2</button>
        </div>
      )}

      
      {activeTask === "task1" && <PdfViewer />}

      
      {activeTask === "task2" && <BillComponent />}
    </div>
  
    </div>
  );
}

export default App;
