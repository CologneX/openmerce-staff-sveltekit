FROM node:lts AS build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm ci --omit=dev

FROM node:lts-alpine
# We don't need ca-certificates, because we don't need to connect to anything
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "build"]