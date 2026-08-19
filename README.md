# DBalance Website

Landing page informativa de DBalance en Angular 17.

## Instalación

```bash
npm install
ng serve
```

Abre http://localhost:4200

## Estructura

```
src/
├── app/
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── components/
│       └── landing/
│           ├── landing.component.ts   ← Lógica + selector de idioma
│           ├── landing.component.html ← Template
│           └── landing.component.scss ← Estilos
├── assets/
│   └── i18n/
│       ├── landing-es.json
│       ├── landing-en.json
│       ├── landing-fr.json
│       └── landing-pt.json
├── index.html
├── main.ts
└── styles.scss
```

## Idiomas disponibles
- 🇪🇸 Español
- 🇬🇧 English
- 🇫🇷 Français
- 🇧🇷 Português

## Secciones
1. **Hero** — con mini-dashboard animado
2. **Características** — 6 cards de funcionalidades
3. **Cómo funciona** — 4 pasos
4. **Beneficios** — con preview de la app real
5. **FAQ** — acordeón interactivo
6. **CTA final** — llamado a la acción
7. **Footer** — con links de navegación
