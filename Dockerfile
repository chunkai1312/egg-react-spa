FROM node:8

ARG APP_VERSION
ENV APP_NAME Egg-React SPA
ENV APP_VERSION $APP_VERSION

WORKDIR /app
COPY . /app
RUN yarn install && \
    yarn build && \
    if [ -n "${APP_VERSION}" ]; then yarn install --production; fi

EXPOSE 7001
CMD yarn start
