FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY *.mjs schema.sql ./
COPY migrations ./migrations
COPY test ./test
USER node
EXPOSE 8080
CMD ["node", "index.mjs"]
