FROM node:16

WORKDIR /usr/src/app

# copy source files
COPY . /usr/src/app

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start