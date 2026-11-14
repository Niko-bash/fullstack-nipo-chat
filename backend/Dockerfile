# syntax=docker/dockerfile:1

FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /repo

# --- Устанавливаем зависимости (кешируемый слой) ---
FROM base AS deps
# Копируем только манифесты, чтобы слой зависимостей не сбрасывался при изменении кода
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
# Если есть общие пакеты — добавьте сюда их package.json:
# COPY packages/shared/package.json ./packages/shared/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --- Сборка ---
FROM deps AS build
COPY . .
RUN pnpm --filter backend build

# --- Только production-зависимости для бэкенда ---
FROM build AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm --filter backend --prod deploy --legacy /out

# --- Runtime ---
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-deps /out/node_modules ./node_modules
COPY --from=build /repo/backend/dist ./dist
COPY --from=build /repo/backend/package.json ./package.json
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]