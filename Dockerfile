# Dockerfile for package.json

# Stage 1: Build
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Stage 2: Production
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the installed dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]