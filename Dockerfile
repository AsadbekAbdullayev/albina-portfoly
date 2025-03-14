FROM node:22-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ==== RUN =======
FROM nginx:1.27.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/dist/albina/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
