FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM node:16 AS build-stage

ENV REACT_APP_BACKEND_URL=api

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

RUN ls

RUN npm run build

FROM nginx:1.20-alpine AS final-stage

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
