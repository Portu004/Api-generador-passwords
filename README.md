# 🔐 Gestor de Contraseñas Seguro

Una API REST construida con **Node.js** y **Express** que genera contraseñas seguras de forma automática y las almacena de manera encriptada en una base de datos SQLite. Incluye una interfaz web con efecto visual estilo Matrix.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
  - [Sin Docker](#opción-1-sin-docker)
  - [Con Docker](#opción-2-con-docker-recomendado)
- [Variables de Entorno](#-variables-de-entorno)
- [Uso de la API](#-uso-de-la-api)
- [Interfaz Web](#-interfaz-web)
- [Licencia](#-licencia)

---

## ✨ Características

- Generación automática de contraseñas seguras
- Almacenamiento encriptado en base de datos SQLite
- API REST con endpoints para crear y consultar contraseñas
- Interfaz web con animación estilo **Matrix**
- Soporte para **Docker** y **Docker Compose**
- Configuración mediante variables de entorno

---

## 🛠 Tecnologías

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | 20 (slim) | Runtime del servidor |
| Express | ^5.2.1 | Framework web / API REST |
| SQLite3 | ^6.0.1 | Base de datos embebida |
| dotenv | ^17.4.2 | Gestión de variables de entorno |
| cors | ^2.8.6 | Habilitación de CORS |
| nodemon | ^3.1.14 | Recarga automática en desarrollo |
| Docker | - | Contenerización |
| Bootstrap | 5.3.0 | Estilos de la interfaz web |

---

## 📁 Estructura del Proyecto

```
Api-generador-passwords/
├── server.js              # Punto de entrada de la API
├── index.html             # Interfaz web del gestor
├── style.css              # Estilos personalizados
├── mis_contrasenas.db     # Base de datos SQLite
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── LICENSE
```

---

## ✅ Requisitos Previos

**Sin Docker:**
- Node.js v18 o superior
- npm

**Con Docker:**
- Docker
- Docker Compose

---

## 🚀 Instalación

### Opción 1: Sin Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/Portu004/Api-generador-passwords.git
cd Api-generador-passwords

# 2. Instalar dependencias
npm install

# 3. Crear archivo de entorno
cp .env.example .env
# Editar .env con tus valores (ver sección de variables de entorno)

# 4. Iniciar en desarrollo
npm run dev

# O en producción
npm start
```

### Opción 2: Con Docker (recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Portu004/Api-generador-passwords.git
cd Api-generador-passwords

# 2. Levantar los contenedores
docker-compose up --build

# Para correr en segundo plano
docker-compose up -d --build
```

El servidor estará disponible en: `http://localhost:3017`

---

## 🔑 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3017
SECRET_KEY=tu_clave_secreta_aqui
```

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto en que corre la API | `3017` |
| `SECRET_KEY` | Clave para encriptar las contraseñas | `mi_clave_super_secreta` |

> ⚠️ **Importante:** Nunca subas tu archivo `.env` real al repositorio. Asegúrate de que esté en el `.gitignore`.

---

## 📡 Uso de la API

### Base URL

```
http://localhost:3017/api/contrasenas
```

---

### `GET /api/contrasenas`

Devuelve la lista de todos los servicios registrados (sin mostrar las contraseñas en texto plano).

**Ejemplo de respuesta:**

```json
{
  "datos": [
    { "id": 1, "servicio": "GitHub" },
    { "id": 2, "servicio": "Netflix" }
  ]
}
```

---

### `POST /api/contrasenas`

Genera una contraseña segura para el servicio indicado y la guarda encriptada.

**Body (JSON):**

```json
{
  "servicio": "Gmail"
}
```

**Ejemplo de respuesta:**

```json
{
  "servicio": "Gmail",
  "password_generada": "xK9$mR2#pL7@"
}
```

> ⚠️ **Nota:** La contraseña generada solo se muestra una vez. En la base de datos queda almacenada de forma encriptada.

---

## 🖥 Interfaz Web

El proyecto incluye una interfaz web accesible desde el navegador en `http://localhost:3017`.

**Funcionalidades de la interfaz:**

- Formulario para ingresar el nombre del servicio y generar una contraseña con un clic
- Visualización de la contraseña generada (solo al momento de crearla)
- Bóveda con la lista de todos los servicios registrados
- Animación de fondo estilo **Matrix** con caracteres en cascada

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consultá el archivo [LICENSE](./LICENSE) para más detalles.

---

> Desarrollado por [Portu004](https://github.com/Portu004)
