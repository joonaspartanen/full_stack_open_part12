FROM node:14 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM node:14 AS final-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

CMD ["npm", "start"]
