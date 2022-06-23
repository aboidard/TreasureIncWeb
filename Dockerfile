FROM node:16

WORKDIR /usr/src/app

# copy source files
COPY . /usr/src/app

# install dependencies
RUN yarn install

# start app
RUN yarn run build
EXPOSE 3000
CMD yarn run start