# Install dependencies only when needed
FROM node:16-alpine AS deps
ARG BACKEND_ENDPOINT
ENV BACKEND_ENDPOINT=$BACKEND_ENDPOINT
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm ci -legacy-peer-deps && npm cache clean --force

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
ARG BACKEND_ENDPOINT
ENV BACKEND_ENDPOINT=$BACKEND_ENDPOINT
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
ARG BACKEND_ENDPOINT
ENV BACKEND_ENDPOINT=$BACKEND_ENDPOINT
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000

CMD ["node", "server.js", "next", "start"]