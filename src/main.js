const electron = require('electron');

const countdown= require('./countdown');

const app = electron.app;

const BrowserWindow= electron.BrowserWindow;

const ipc = electron.ipcMain;


const windows=[];

app.on('ready',function(){
    [1,2,3].forEach(_=>{
        let win= new BrowserWindow({
        height:400,
        width:400
  
    });
 

    win.loadURL(`file://${__dirname}/countdown.html`);

    countdown();

    win.on('closed',_=>{
        console.log('closed');
        mainWindow=null;
    })

    windows.push(win);
      });
});

console.log('main');


ipc.on('countdown-start',_=>{
   // console.log('caught it');
   countdown(count=>{
       windows.forEach(win=>{
         win.webContents.send('countdown',count);
       })
      
   })
})
