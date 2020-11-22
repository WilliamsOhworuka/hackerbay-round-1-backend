FROM node:13.7-alpine3.11

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY . .

# Expose this port number
EXPOSE 8080

# Run this command to boot up the server
CMD npm start