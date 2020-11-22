FROM node:13.7-alpine3.11

COPY package.json /app
RUN npm install
COPY . /app

# Create app directory
WORKDIR /app

# Expose this port number
EXPOSE 8080

# Run this command to boot up the server
CMD npm start