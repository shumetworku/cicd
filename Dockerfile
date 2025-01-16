# Use the latest Node.js LTS image
FROM node:lts

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to leverage layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app after installing dependencies
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
