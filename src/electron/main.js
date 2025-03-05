import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"))
});



ipcMain.on("print-pdf", (event, pdfFile) => {
    console.log("Received PDF file:", pdfFile);
  
    // Create a hidden window to load the PDF
    let printWindow = new BrowserWindow({ show: false });
  
    printWindow.loadURL(pdfFile);
  
    printWindow.webContents.once("did-finish-load", () => {
      printWindow.webContents.print({ silent: false, printBackground: true }, () => {
        printWindow.close();
      });
    });
  });



ipcMain.on("print-bill", () => {
  if (mainWindow) {
    mainWindow.webContents.print({ silent: false, printBackground: true });
  }
});