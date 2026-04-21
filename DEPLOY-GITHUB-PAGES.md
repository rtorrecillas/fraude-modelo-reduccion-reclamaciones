# GitHub Pages

## Flujo previsto

1. Crear un repositorio dedicado en GitHub.
2. Subir este proyecto a la rama `main`.
3. En GitHub:
   - `Settings`
   - `Pages`
   - `Source: GitHub Actions`
4. Hacer `push` a `main`.
5. Esperar a que el workflow `Deploy presentation to GitHub Pages` termine en verde.

## Que publica

- Build usado: `npm run build`
- Carpeta publicada: `dist`

## Validacion minima

- La home carga correctamente.
- Se navega entre las 4 escenas.
- Los assets cargan sin errores.
