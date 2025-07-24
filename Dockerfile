# Use Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy app files to container
COPY . .

# Install dependencies
RUN npm install

# Expose app port (change if needed)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
