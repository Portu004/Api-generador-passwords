# Usamos una versión ligera de Node.js
FROM node:20-slim

# Instalamos herramientas necesarias para que compile SQLite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto que usa tu API
EXPOSE 3017

# Comando para arrancar la app
CMD ["node", "server.js"]