# Musicfy

Desktop application, spotify clone made with react, firebase and electron.

## Preview

![](/.readme-static/app.png)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn electron-dev
```

### Compiles and minifies for production - windows

```
yarn electron-pack --win
```

## Notes

You need to create a firebase project and add your credentials to an .env file

```javascript
REACT_APP_APIKEY = ****
REACT_APP_AUTHDOMAIN = ****
REACT_APP_PROJECTID = ****
REACT_APP_STORAGEBUCKET = ****
REACT_APP_MESSAGINGSENDERID = ****
REACT_APP_APPID = ****
```

## License

Released under the MIT License
