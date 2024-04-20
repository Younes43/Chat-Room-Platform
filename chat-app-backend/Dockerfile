# Use Node.js version 20
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 3000 on the container for the API
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
