FROM node:20.12.1-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
