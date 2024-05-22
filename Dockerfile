# Use the official Node.js 14 image as the base image
FROM node:16.20.2

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port that your application listens on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
