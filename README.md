# 📱 Android to Linux Notifier Webhook

Este proyecto permite recibir notificaciones de tu dispositivo Android (WhatsApp, Telegram, SMS, TikTok, etc.) directamente en tu escritorio Linux. Incluye alertas visuales nativas y sonido personalizado, permitiéndote mantener el enfoque mientras programas.

## 📝 ¿Qué hace este código?
El sistema funciona como un Webhook local. Un servidor ligero en Node.js escucha peticiones desde tu red Wi-Fi. Cuando tu celular recibe una notificación, envía los datos (título y mensaje) al servidor en tu PC, el cual dispara una notificación nativa de Linux con sonido instantáneo.

## 🚀 Instalación y Configuración rápida
### 1. Clonar el repositorio
Descarga el proyecto completo directamente en tu máquina:

```
git clone https://github.com/soylizardev/Android-to-Linux-Notifier-Webhook.git
cd Android-to-Linux-Notifier-Webhook
```

### 2. Instalación de dependencias

Debes instalar Node.js y las herramientas de notificación según tu distribución:

Debian / Ubuntu / Mint / Kali:
```
sudo apt update && sudo apt install nodejs libnotify-bin pulseaudio-utils
```
Fedora / RedHat / CentOS:
```
sudo dnf install nodejs libnotify pulseaudio-utils
```
Arch Linux / Manjaro:
```
sudo pacman -S nodejs libnotify libcanberra
```
### 3. Preparación del audio

Para que el sonido funcione, coloca un archivo de audio (ejemplo: whatsapp.mp3) dentro de la carpeta del proyecto. El script ya está programado para buscar un archivo con ese nombre exacto.

## 📲 Configuración en el Celular (MacroDroid)

Para enviar las notificaciones, necesitas la app MacroDroid instalada en tu Android. Configura una nueva Macro de la siguiente forma:

Disparador (Trigger): Notificación recibida -> Selecciona las aplicaciones que quieras trackear.

Acción: Solicitud HTTP (POST).

URL: http://TU_IP_PRIVADA:8080 (Consigue tu IP en Linux con el comando hostname -I).

Cuerpo del contenido (JSON):
```JSON
{
  "titulo": "{not_title}",
  "mensaje": "{not_text}"
}
```
Encabezados (Headers): Añade Content-Type: application/json.

Seguridad: Marca la casilla "Permitir cualquier certificado" (Trust all certificates).

## ⚙️ Personalización

Al tener el repositorio clonado, puedes editar server.js para adaptarlo:

Cambiar el Puerto: Modifica la variable const PORT = 8080; si prefieres usar otro.

Comando de Audio: El script utiliza paplay por defecto. Si prefieres otro reproductor (como mpg123), simplemente edita la línea del comando en el archivo JS.

Iconos: Puedes cambiar el parámetro --icon en el comando notify-send para usar iconos personalizados de tu sistema.

## 🔄 Ejecución en Segundo Plano

Para que el servidor esté siempre activo sin tener una terminal abierta, recomendamos usar PM2:

Instalar: 
```
sudo npm install -g pm2
```
Iniciar: 
```
pm2 start server.js --name "notifier"
```
Persistir: 
```
pm2 save y pm2 startup
```
(Sigue las instrucciones en pantalla para habilitar el inicio automático).

## 🔍 Solución de Problemas (Troubleshooting)

* Puerto ocupado (EADDRINUSE): Si el puerto está en uso, límpialo con: ```fuser -k 8080/tcp``` o ```sudo kill -9 $(lsof -t -i:8080)```.

* Bloqueo de Firewall: 

  En Fedora/RHEL: ```sudo firewall-cmd --add-port=8080/tcp --permanent && sudo firewall-cmd --reload```

  En Ubuntu/Debian: ```sudo ufw allow 8080/tcp```

* Error de JSON: Verifica que en el cuerpo del mensaje en MacroDroid no haya una coma después del último campo.

# ⚖️ Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente. Consulta el archivo LICENSE para más detalles.
