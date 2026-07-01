# Stage 1: Build the React Application
FROM node:26-alpine AS build

WORKDIR /app

# Copy dependency definitions and install
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# Vite inlines VITE_* vars at build time, so they must be passed as build args
ARG VITE_API_BASE_URL
ARG VITE_DOMAIN_NAME
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_DOMAIN_NAME=$VITE_DOMAIN_NAME

RUN npm run build

# Stage 2: Serve the Built Application with Nginx
FROM nginx:stable-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from build stage to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
