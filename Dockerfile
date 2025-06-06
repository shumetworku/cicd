# Dockerfile

# base image
FROM node:16.3.0-alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn install

# start app
RUN yarn build
EXPOSE 3000
CMD yarn start
