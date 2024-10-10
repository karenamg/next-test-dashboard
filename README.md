# Dashborad Interactivo
## 24Siete - Prueba Técnica

Construido con Next.js, TypeScript, Tailwind CSS y API REST simulada con JSON Server.

## Funcionalidades
- Visualización de KPIs: total de citas en los últimos seis meses, distribucion de doctores por especialidad, total de citas por especialidad, total de pacientes atendidos y porcentaje de citas aprobadas, canceladas y pendientes.
- Gráficos interactivos implementados con ReCharts
- Visualizacion de datos en tablas
- Filtrado de datos
- Interfaz adaptable a dispositivos móviles y de escritorio
- Exportación de datos en formato CSV
  
## Para iniciar

Correr en la terminal el siguiente comando: 
```bash
git clone https://github.com/karenamg/next-test-dashboard.git
```
Crear un archivo .env.local en la carpeta raiz y copiar la variable de entorno:
```bash
SERVER_HOST=http://localhost:8000
```
Instalar las dependencias
```bash
npm i
```
Correr el servidor del JSON Server
```bash
npm run dev:server
```
En otra terminal, correr el servidor del proyecto
```bash
npm run dev
```
Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver la aplicación.

Se recomienda correr con la última versión LTS de Node.js

