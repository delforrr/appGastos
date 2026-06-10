# App Gastos

UTN FRTL - TPNº 3 - Desarrollo de Aplicaciones Web Full Stack

## Descripción

App Gastos es una aplicación web que permite gestionar gastos personales. Permite llevar un control de gastos, categorizarlos y generar estadísticas sobre los mismos.

## Tecnologías

- React: useState, useEffect, hook personalizado, servicio para conectar con backend, etc.
- TypeScript: Tipado estricto, interface, etc.
- Vite: Build tool.
- Material UI: Componentes de interfaz de usuario.
- React Router: Enrutamiento.
- JSON Server: Base de datos simulada.
- Extra: react-doctor para diagnosticar codigo de frontend y utilizar estándares de React.

## Ejecución

El proyecto está configurado con **NPM Workspaces**, lo que permite instalar las dependencias y ejecutar ambos servicios (frontend y backend) de forma centralizada.

### Pasos para iniciar:

1. Instalar todas las dependencias del proyecto (raíz, frontend y backend):
   ```bash
   npm install
   ```

2. Iniciar el entorno de desarrollo (arranca el frontend en `http://localhost:5173` y el backend en `http://localhost:3001` de forma simultánea):
   ```bash
   npm run dev
   ```

