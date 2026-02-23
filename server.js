const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        const data = JSON.parse(body);
        const rutaIcono = path.join(__dirname, './icon.png');
        console.log("Datos recibidos:", body);
        
        try {
            const data = JSON.parse(body);
            const sonido = "./noti.mp3"; 
            const comando = `paplay ${sonido} & DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/${process.getuid()}/bus notify-send '${data.titulo}' '${data.mensaje}' --icon=${rutaIcono}`;
            
            exec(comando, (error, stderr) => {
                if (error) console.error(`Error de ejecución: ${error}`);
                if (stderr) console.error(`Stderr: ${stderr}`);
            });

            res.writeHead(200);
            res.end('OK con sonido');
            
        } catch (e) {
            console.error("Error en el JSON o ejecución:", e.message);
            res.writeHead(400);
            res.end('Error en el servidor');
        }
    });
});

server.listen(8080, '0.0.0.0', () => {
    console.log('Servidor listo. Esperando notificaciones...');
});