# --- Base Stage ---
# Use a lightweight Node.js image as the base for all stages
FROM node:20-alpine AS base

# --- Builder Stage ---
# This stage installs dependencies and builds the Next.js application
FROM base AS builder
WORKDIR /app

# Install dependencies
# Copy package.json and lock files to leverage Docker cache
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# --- Runner Stage (Final Image) ---
# This stage creates the minimal production image using the standalone output
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy the standalone output, public assets, and static files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port Next.js runs on (default 3000)
EXPOSE 3000

# Command to run the application
# The standalone output generates a server.js file
CMD ["node", "server.js"]
