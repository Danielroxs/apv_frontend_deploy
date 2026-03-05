# APV — Administrador de Pacientes de Veterinaria

Aplicación fullstack tipo dashboard para veterinarios: autenticación, gestión de pacientes y perfil. El proyecto está pensado para desplegarse “barato” como portfolio usando MongoDB Atlas + Vercel (Serverless Functions) sin levantar un servidor dedicado.

## Funcionalidades

- Registro e inicio de sesión (JWT)
- Rutas protegidas (panel /admin)
- CRUD de pacientes (crear, listar, editar, eliminar)
- Edición de perfil
- Cambio de password
- Restablecimiento de password (modo demo)
  - En lugar de enviar correo real, se muestra un enlace clickeable con el token

## Tecnologías

**Frontend**

- React
- Vite
- Tailwind CSS
- React Router
- Axios

**Backend (Serverless en Vercel)**

- Vercel Serverless Functions (carpeta `api/`)
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Hash de passwords con `bcryptjs`

## Arquitectura (resumen)

- El frontend consume el backend con Axios apuntando a `/api` por defecto.
- En Vercel, todo lo que vive en `api/` se expone como endpoints serverless (por ejemplo: `/api/veterinarios/login`, `/api/pacientes`).
- Para desarrollo local “fullstack” debes usar `vercel dev` (Vite por sí solo NO sirve `api/`).

## Requisitos

- Node.js 18+ (recomendado)
- Cuenta de MongoDB Atlas (cluster + usuario de base de datos)

## Variables de entorno

Este repo incluye un archivo `.env.example`. Crea tu `.env` en la raíz y agrega:

- `MONGODB_URI` — connection string de Atlas
- `JWT_SECRET` — string largo aleatorio
- `MONGODB_DB` — `apv` (opcional si ya especificas la DB dentro de la URI)

Generar un `JWT_SECRET` (ejemplo con Node):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Nota: `.env` y `.env.local` están ignorados por Git.

### (Opcional) `VITE_BACKEND_URL`

Si en algún momento quieres consumir un backend externo, puedes definir `VITE_BACKEND_URL` (sin `/api`) y el frontend lo usará como base URL. En deploy con Vercel normalmente NO es necesario.

## Correr en local

Instalar dependencias:

```bash
npm install
```

Levantar frontend + API (recomendado):

```bash
npm run dev:vercel
```

Levantar solo frontend (no recomendado si quieres usar `/api/*`):

```bash
npm run dev
```

## Deploy en Vercel (portfolio)

1. Importa este repo en Vercel.
2. Configura Environment Variables en Vercel:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `MONGODB_DB` (opcional)
3. En MongoDB Atlas, confirma:
   - El cluster está activo
   - Network Access permite conexiones desde Vercel (para demo rápido se suele usar `0.0.0.0/0`, no recomendado para producción)
4. Deploy.

## Nota sobre el restablecimiento de password (demo)

Para hacerlo simple y demostrable en portfolio, el flujo de “Olvidé mi password” no envía un correo real. En su lugar, el backend genera un token y la UI muestra un enlace clickeable para completar el restablecimiento.

## Seguridad

- No subas tus secretos a GitHub (`.env`, `.env.local`).
- Si compartes accidentalmente una credencial, rótala en Atlas/Vercel y actualiza tus env vars.
