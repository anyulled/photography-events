# Stage 1: Install dependencies
ARG NODE_VERSION=22-alpine
FROM node:${NODE_VERSION} AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the app
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# Copy the installed dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the entire application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 3: Run the production container
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy the built application and necessary static files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use the non-root user
USER nextjs

# Expose the necessary port
EXPOSE 3000

# Healthcheck to ensure the app is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD curl --fail http://localhost:3000 || exit 1

# Start the Next.js app using the standalone server
CMD ["node", "server.js"]
