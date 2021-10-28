FROM node:14

ENV REACT_APP_BACKEND_URL=http://localhost:3003

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN CI=true

CMD ["npm", "start"]
