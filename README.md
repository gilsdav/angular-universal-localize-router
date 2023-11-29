# angular-universal-localize-router

Angular (5-17) + universal + ngx-translate + ngx-translate-router + lazyloading

## Find appropriate source

Choose the branch when you clone this repo:
* angular-5
* angular-7
* angular-8
* angular-9
* angular-10
* angular-11
* angular-12
* angular-13
* angular-14
* angular-16
* angular-17

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Start universal dev server

Run `npm run dev:ssr` to start the project with universal in debug mode. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build:ssr` to build the project. The build artifacts will be stored in the `dist/` directory.

## Universal server

Run `npm run serve:ssr` for a universal server. Navigate to `http://localhost:4000/`.

## Run artifacts on server

Copy `browser` and `server` folders in the same server on your server.

Go to the parent folder and run `node server/main.js`.

Navigate to `http://localhost:4000/`.
