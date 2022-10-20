# Specify base image
FROM node:16-alpine3.15
# FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Copy codebase
COPY ./ ./

# Execute container command
CMD ["npm", "run", "dev"]