FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg fonts-dejavu-core && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY server/*.mjs server/schema.sql ./
USER node
ENV NODE_ENV=production PORT=8090
EXPOSE 8090
CMD ["node","index.mjs"]
