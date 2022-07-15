
// Modules
const {Menu, shell, app} = require('electron')

// Module function to create main app menu
module.exports = () => {

    // Menu template
    let template = [
        ...(process.platform === 'darwin' ? 
            // true
            [   {
                role: 'appMenu'
                }
            ]
             : 
            // false
            [
                {
                    label: 'File',
                    submenu: [
                        {
                            label: 'Exit',
                            click: () => app.quit()
                        }
                    ]
                }
            ]
            ),
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