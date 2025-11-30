FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY vite.config.mjs ./
COPY index.html ./
COPY postcss.config.cjs ./
COPY tailwind.config.cjs ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs
EXPOSE 8080
CMD ["node","server.mjs"]
