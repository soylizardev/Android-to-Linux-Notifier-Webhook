const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        console.log("Datos recibidos:", body);
        
        try {
            const data = JSON.parse(body);
            const sonido = "./whatsapp.mp3"; // Asegúrate de que el archivo esté aquí
            
            // Unificamos: Sonido + Variable de Entorno + Notificación
            // Usamos comillas simples en data.titulo/mensaje por seguridad
            const comando = `paplay ${sonido} & DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/${process.getuid()}/bus notify-send '${data.titulo}' '${data.mensaje}' --icon=notification-message-im`;
            
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