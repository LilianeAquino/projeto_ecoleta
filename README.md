<h1 align="center">
  <img width="300" alt="Ecoleta" src="/img/home.png">
</h1>

## ♻ Ecoleta | Next Level Week #1

Nessa aplicação é possível registrar pontos de coleta, tipos de materiais coletados pelo estabelecimento e mostra os pontos de coleta no mapa.

## 🚀 Index
- ⚙ [Tecnologies](#-tecnologies)
- 💻 [How to run](#-how-to-run)
- 📷 [Previews](#-previews)

---

## ⚙ Technologies
  - **Back end**
    - NodeJS
    - Express
    - Typescript
    - Sqlite
    - multer
    - celebrate/Joi
  
  - **Front end**
    - ReactJS
    - Typescript
    - react-router-dom
    - axios
    - leaflet (Free map)
    - react-leaflet
  
  - **Mobile**
    - React Native/Expo
    - Typescript
    - react-navigation
    - axios
    - react-native-picker-select
    - react-native-svg
    - react-native-maps
    - expo-font
    - expo-location
    - expo-mail-composer

---

## 💻 How to run

  > Cloning the repository
  ```bash
    # Cloning repository
    git clone git@github.com:LilianeAquino/projeto_ecoleta.git
  ```

  > Running server
  ```bash
    # Accesing server
    cd server

    # Creating tables
    yarn run knex:migrate

    # Creating seeds
    yarn run knex:seed
    
    # Running server
    yarn dev
  ```

  > Running web project
  ```bash
    # Accesing web project
    cd web
    
    # Running web project
    yarn start
  ```

  > Running mobile project
  > You will need to download the Expo app. When the application starts, scan the qrcode with the Expo you installed.
  ```bash
    # Accessing mobile project
    cd mobile

    # Change the IP in services/api.ts to connect with the back end
    cd services

    # Running
    yarn start
  ```