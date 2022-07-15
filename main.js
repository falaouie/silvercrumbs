// Modules
const {app, BrowserWindow, Menu} = require('electron')

// Platform 
const isMac = process.platform === 'darwin' ? true : false
// Set Environment
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false

// const updater = require('./updater')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let aboutWindow

// Create a new BrowserWindow when `app` is ready
function createMainWindow () {
  // check for updates after 3 seconds

 // setTimeout(updater, 3000)

  mainWindow = new BrowserWindow({
    title: 'Silver System',
    show: false,
    backgroundColor: '#eceeee',
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

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

function createAboutWindow () {
  aboutWindow = new BrowserWindow({
    title: 'About Silver System',
    width: 600,
    height: 300,
    backgroundColor: '#eceeee',
    resizable: false,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  aboutWindow.loadFile('./about.html')
  if (isDev) aboutWindow.webContents.openDevTools();

  // Listen for window being closed
  aboutWindow.on('closed',  () => {
    aboutWindow = null
  })
}

// Menu template
let template = [
  ...(isMac ? [{
      label: app.name,
      submenu: [
          {
             label: 'About',
             click: createAboutWindow
          },
          {
            role: 'quit'
          }
      ]
  }] : []),
  // { role: 'fileMenu' }
  {
      label: 'File',
      submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
      ]
  },
  {
      role: 'editMenu'
  },
  {
      role: 'windowMenu'
  },
  ...(isDev ? [
      {
          label: 'Develepor',
          submenu: [
              { role: 'reload'},
              { role: 'forcereload'},
              { type: 'separator'},
              { role: 'toggledevtools'}
          ]
      }
  ] : []),
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
       }
      ]
    }
  ] : [])
  /*
  {
      role: 'help',
      submenu: [
          {
              label: 'Learn More',
              click: () => {
                  shell.openExternal('https://google.com')
              }
          }
      ]
  }
  */
]

// Build menu
let menu = Menu.buildFromTemplate(template)

//  Set as main application menu
Menu.setApplicationMenu(menu)

// Electron `app` is ready
app.whenReady().then(() => {
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
