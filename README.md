# Gimnasio UCP

## Descripción

Aplicación orientada a la administración interna de un gimnasio, proporcionando
un modulo de autenticación para administradores, y el manejo de flujo de inventario y usuarios.

## Requisitos de instalación

- [Nodejs version LTS](https://nodejs.org/es/download/)
- [Vue version 2](https://cli.vuejs.org/guide/installation.html)

## Ejecutando Proyecto

- Backend

```bash
  cd backend
  npm install
  npm run start_windows
```

- Frontend

```bash
  cd frontend
  npm install
  npm run serve
```

## Caracteristicas Funcionales

La aplicación esta desarrollada en dos módulos, backend y frontend.

### Backend

Módulo encargado de la lógica con la base de datos de usuarios, administradores, gimnasio e inventario. Ademas posee rutas que permiten realizar CRUD de cada
involucrado. (Crear Leer Actualizar y Eliminar)

### Frontend

Módulo encargado de crear una interfaz para el administrador, donde proporcione
vistas y componentes reutilizables optimos y rápidos con las caracteristicas
de los nuevos estandares web.

## Desarrollo

El backend se desarrolló en NodeJS y el Frontend con el framework VueJS, tecnologías que predominan actualmente por sus caracteristicas de performance.
