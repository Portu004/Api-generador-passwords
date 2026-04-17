require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. CONFIGURACIÓN DE BASE DE DATOS ---
const db = new sqlite3.Database('./mis_contrasenas.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS credenciales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        servicio TEXT NOT NULL,
        password_encriptada TEXT NOT NULL,
        iv TEXT NOT NULL
    )`);
});

// --- 2. LÓGICA DE ENCRIPTACIÓN (AES-256-CBC) ---
const ALGORITHM = 'aes-256-cbc';
const rawKey = process.env.SECRET_KEY || '306100e8b2b6b5d02a0f06f2867b975f';
const SECRET_KEY = crypto.scryptSync(rawKey, 'salt', 32); 

function encriptar(texto) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encriptado = cipher.update(texto, 'utf8', 'hex');
    encriptado += cipher.final('hex');
    return { iv: iv.toString('hex'), content: encriptado };
}

// --- 3. ENDPOINTS (Las rutas de la API) ---

// Ruta para GENERAR y GUARDAR (POST)
app.post('/api/contrasenas', (req, res) => {
    const { servicio } = req.body;

    if (!servicio) {
        return res.status(400).json({ error: 'El servicio es requerido' });
    }

    // Generamos la contraseña 
    const base = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@()[]{}*,;/-_¿?.!$><#+=&";
    let password = "";
    for (let i = 0; i < 14; i++) {
        password += base.charAt(Math.floor(Math.random() * base.length));
    }

    const { iv, content } = encriptar(password);

    db.run(
        `INSERT INTO credenciales (servicio, password_encriptada, iv) VALUES (?, ?, ?)`,
        [servicio, content, iv],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            res.json({ 
                mensaje: "Guardado exitoso",
                id: this.lastID, 
                servicio: servicio, 
                password_generada: password 
            });
        }
    );
});

// Ruta para LISTAR los servicios (GET)
app.get('/api/contrasenas', (req, res) => {
    db.all(`SELECT id, servicio FROM credenciales`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ datos: rows });
    });
});

// --- 4. INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 3017;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});