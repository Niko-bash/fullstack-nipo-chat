# syntax=docker/dockerfile:1

FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /repo

# --- Зависимости ---
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --- Сборка статики ---
FROM deps AS build
COPY . .
RUN pnpm --filter frontend build

# --- Nginx для раздачи статики ---
FROM nginx:alpine AS runner
# Копируем собранные файлы (проверьте папку: Vite обычно кладёт в dist, CRA — в build)
COPY --from=build /repo/frontend/dist /usr/share/nginx/html
# Если используете React Router (BrowserRouter), нужен nginx.conf с try_files:
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]