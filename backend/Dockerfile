# --- Builder Stage ---
# NOTE: The build context is the repository root (see .github/workflows/release.yml).
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies using Yarn
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy configs and source
COPY backend/webpack.config.ts backend/tsconfig.json ./
COPY backend/src ./src
COPY backend/main.ts ./

# Build the app
RUN yarn build


# --- Production Stage ---
FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install only production dependencies
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built app
COPY --from=builder /usr/src/app/dist ./

# Copy static frontend, served by the backend at /
COPY frontend/alias-lookup ./static

# Set permissions and run as non-root user
RUN chown -R node:node .
USER node

EXPOSE 9404

CMD ["node", "app.js"]
