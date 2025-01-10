# Use the latest node LTS release
FROM node:gallium

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to optimize layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app after installing dependencies
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
