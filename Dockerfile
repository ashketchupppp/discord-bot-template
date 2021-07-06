FROM node:14

# Create app directory
WORKDIR /usr/src/app
COPY . .

# install top-level
RUN npm ci

# install client
WORKDIR /usr/src/app/client
RUN npm ci

# install server
WORKDIR /usr/src/app/server
RUN npm ci 

EXPOSE 8080
WORKDIR /usr/src/app
CMD ["npm", "run" ,"start"]