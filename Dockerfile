FROM node:10.16.0-alpine

WORKDIR /workdir
COPY . /workdir

ENV PORT 3000
EXPOSE 3000

RUN npm install --silent --progress=false --production

CMD ["npm","start"]