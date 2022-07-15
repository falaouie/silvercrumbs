
// Modules
const {Menu, shell, app} = require('electron')

// Platform 
const isMac = process.platform === 'darwin' ? true : false

// Module function to create main app menu
module.exports = () => {

    // Menu template
    let template = [
        ...(isMac ? [{ role: 'appMenu' }] : []),
        {
        ...(isMac ? 
                // Mac 
                {
                    label: 'File',
                    submenu: [
                        {
                        label: 'Quit',
                        accelerator: 'Cmd+W',
                        click: () => app.quit()
                        }

                    ]
                }
                :
                // Win
                {
                    label: 'File',
                    submenu: [
                        {
                        label: 'Exit',
                        accelerator: 'Ctrl+W',
                        click: () => app.quit()
                        }

                    ]
                }
            )
        },
        {
            role: 'editMenu'
        },
        {
            role: 'windowMenu'
        },
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
}