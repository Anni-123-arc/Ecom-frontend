#step 1:build ng app
FROM node:latest

WORKDIR /app

# installing dependencies

COPY package*.json ./

# run install command
RUN npm install

# copy source code

COPY . .

# expose ng dev port

EXPOSE 4200


# start application

CMD ["npm" , "start"]
