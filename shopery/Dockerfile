# -------- Stage 1: Build React App --------
FROM node:18 AS build

WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Use --legacy-peer-deps to avoid TypeScript conflict
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# -------- Stage 2: Serve with Nginx --------
FROM nginx:alpine

# Clean default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Optionally customize nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose default port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
