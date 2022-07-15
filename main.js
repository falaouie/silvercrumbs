// Modules
const {app, BrowserWindow} = require('electron')
const appMenu = require('./menu')


// Platform 
const isMac = process.platform === 'darwin' ? true : false

// Set Environment
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false

// const updater = require('./updater')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createMainWindow () {
  // check for updates after 3 seconds

 // setTimeout(updater, 3000)

  mainWindow = new BrowserWindow({
    title: 'Silver System',
    show: false,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Create main app menu
  appMenu()

  // Load index.html into the new BrowserWindow
  mainWindow.loadURL('http://devsilver.alawiyeh.com')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })

  // kirmel el commit el jdeed
  mainWindow.maximize()
  mainWindow.show()
}

// Electron `app` is ready
app.on('ready', () => {
  createMainWindow()

  mainWindow.on('closed', () => mainWindow = null)
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})
