# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Variables de entorno

Este frontend hace llamadas al backend con Axios usando `VITE_BACKEND_URL`.

1. Crea un archivo `.env` en la raíz (puedes copiar `.env.example`)
2. Define la URL de tu backend (sin `/api`), por ejemplo:

```
VITE_BACKEND_URL=http://localhost:4000
```

3. Reinicia `npm run dev`

Si no está configurada, verás requests en consola como `undefined/api/...` y el navegador devolverá `404`.

## Deploy (portfolio) con MongoDB Atlas + Vercel

Este repo incluye endpoints serverless en `api/` para que puedas desplegar Frontend + API en Vercel.

En Vercel configura estas variables de entorno:

- `MONGODB_URI`: tu connection string de MongoDB Atlas
- `JWT_SECRET`: un string largo aleatorio
- (opcional) `MONGODB_DB=apv`

En MongoDB Atlas:

- Asegúrate de que el cluster esté activo (no pausado)
- En **Network Access** permite conexiones. Para demo rápido puedes usar `0.0.0.0/0` (no recomendado para producción)

Notas:

- En Vercel NO necesitas `VITE_BACKEND_URL` (el frontend usa `/api`).
- Para desarrollo local con API, usa `npm run dev:vercel` (Vite por sí solo NO sirve `api/` y te dará 404 en `/api/*`).
