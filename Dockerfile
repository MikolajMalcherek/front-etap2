FROM node:18 AS build

WORKDIR /app

# Skopiuj package.json i package-lock.json do /app
COPY package*.json ./

# instalacja zależności
RUN npm install

# instalacja Angular CLI globalnie wewnątrz całego kontenera
RUN npm install -g @angular/cli

#Skopiuj wszystkie pliki 
COPY . ./

# Zbuduj aplikację
RUN npm run build 

# Użycie oficjalnego obrazu Nginx do serwowania aplikacji
FROM nginx:alpine

# Skopiuj zbudowaną aplikację do katalogu Nginx
COPY --from=build /app/dist/chat-app-frontend /usr/share/nginx/html

# Skopiowanie pliku konfiguracyjnego Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Skopiowanie certyfikatów SSL do kontenera
COPY ./loadbalancer.crt /etc/ssl/certs/loadbalancer.crt
COPY ./loadbalancer.key /etc/ssl/private/loadbalancer.key
COPY ./certpassPhrase /etc/nginx/certpassPhrase

# Ustaw odpowiednie uprawnienia dla pliku z hasłem
RUN chmod 600 /etc/nginx/certpassPhrase

# Eksponuj port 80
EXPOSE 80 443

# Uruchom serwer Nginx
CMD ["nginx", "-g", "daemon off;"]