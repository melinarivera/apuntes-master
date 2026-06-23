# Apuntes del máster 📚

Landing para compartir apuntes con los compañeros, con subida de PDFs a Supabase y deploy en GitHub Pages.

---

## Setup en 3 pasos

### 1. Crear proyecto en Supabase (gratis)

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto gratis
2. En el **SQL Editor**, ejecuta:

```sql
create table apuntes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  autor text not null,
  materia text not null,
  titulo text not null,
  descripcion text,
  paginas integer,
  pdf_url text,
  es_propio boolean default false
);

alter table apuntes enable row level security;
create policy "Lectura publica" on apuntes for select using (true);
create policy "Insercion publica" on apuntes for insert with check (true);
```

3. En **Storage**, crea un bucket llamado `apuntes` y márcalo como **público**
4. Ve a **Settings → API** y copia la `Project URL` y la `anon key`

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env con tus credenciales de Supabase
```

### 3. Añadir tus apuntes propios

Edita `src/App.jsx`, busca `MY_NOTES` y actualiza:
- Sube tu PDF al bucket `apuntes` en Supabase Storage → copia la URL pública → pégala en `pdf_url`

---

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy en GitHub Pages

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Añade los secrets en GitHub → Settings → Secrets → Actions.

---

## Personalización rápida

- **Tus datos**: edita `MY_NOTES` en `src/App.jsx`
- **Materias**: edita `MATERIAS_FILTER` en `src/App.jsx` y `MATERIAS` en `src/UploadModal.jsx`
- **Colores por materia**: edita `ACCENT_MAP` en `src/NoteCard.jsx`
# apuntes-master
