FROM node:20.0.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20.0.0-alpine

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./ 

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
