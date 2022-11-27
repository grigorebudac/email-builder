FROM node:16-slim
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PORT=3333

EXPOSE ${PORT}
WORKDIR /app

COPY ./apps/api/prisma ./prisma/
COPY ./apps/api/.env .
COPY ../../dist/apps/api .

RUN apt-get update && apt-get install -y openssl libssl-dev
RUN npm install --production
RUN npx --yes prisma generate

CMD node ./main.js