# Deploying to Dokploy

This is a Next.js 16 app configured for containerized deployment via Docker
(Next.js `standalone` output).

## Files involved

- `Dockerfile` — multi-stage build producing a minimal standalone runner image.
- `.dockerignore` — keeps the build context small (excludes `node_modules`,
  `.next`, the 36 MB `scenes/` 3D source dir, etc.).
- `docker-compose.yml` — optional; lets Dokploy deploy via the Compose type with
  a healthcheck and port mapping.
- `next.config.ts` — `output: "standalone"` + pinned `outputFileTracingRoot`.

The app listens on port **3000**.

## Option A — Dokploy "Application" (Dockerfile)

1. In Dokploy, create a new **Application**.
2. Set the **Provider** to your Git repo and branch.
3. Set **Build Type** to **Dockerfile** (path: `./Dockerfile`).
4. Under **Network**, expose **port 3000** and attach a domain.
5. Deploy.

No environment variables are required. `NODE_ENV`, `PORT`, and `HOSTNAME` are set
inside the image.

## Option B — Dokploy "Compose"

1. Create a new **Compose** service pointing at this repo.
2. Dokploy uses `docker-compose.yml`. The service only `expose`s port 3000 on
   the internal Docker network — it is **not** published to the host. Attach a
   domain to the `web` service on port 3000 via Dokploy's domain UI; Traefik
   routes to the container internally.
3. Deploy.

## Notes

- The container runs as a non-root user (`nextjs`).
- Static assets and `public/` are copied into the image; no volume is needed.
- A healthcheck hits `/` on port 3000.
- TLS/domains are handled by Dokploy's built-in Traefik proxy — the app serves
  plain HTTP on 3000 behind it.
