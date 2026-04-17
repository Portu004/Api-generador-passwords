require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ... (Configuración de la Base de datos queda igual) ...

// --- NUEVA LÓGICA DE ENCRIPTACIÓN ---
const ALGORITHM = 'aes-256-cbc';

// Ahora leemos la llave desde process.env
// Usamos un fallback ('llave_por_defecto...') solo por si te olvidás de crear el .env
const rawKey = process.env.SECRET_KEY || '306100e8b2b6b5d02a0f06f2867b975f';
const SECRET_KEY = crypto.scryptSync(rawKey, 'salt', 32); 

function encriptar(texto) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encriptado = cipher.update(texto, 'utf8', 'hex');
    encriptado += cipher.final('hex');
    return { iv: iv.toString('hex'), content: encriptado };
}

// ... (Los Endpoints quedan exactamente igual) ...

// --- NUEVA CONFIGURACIÓN DEL PUERTO ---
// Le decimos: "Usá el puerto del entorno, y si no existe, usá el 3000"
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});