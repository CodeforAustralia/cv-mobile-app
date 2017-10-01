# cv-mobile-app
This repository is a web application built with `choo`. It has been designed for mobile access (so far).

It serves as a website for Victorian offenders on Community Correction Orders to learn about and manage administrative details of their order. The website currently offers the ability to:

- View reminders and messages exchanged with a case manager.

## Environments
`cv-mobile-app` should run in any environments that support [Node.js](https://nodejs.org), but it has been developed and tested on `Mac OS X 10.12.5` using `Node.js v.6.10.0`.

This code has *not* been tested on Windows.

## Installation
To install and run `cv-mobile-app`, clean and then navigate to the repository:

```
$ git clone https://github.com/CodeforAustralia/cv-mobile-app
$ cd cv-mobile-app
```

You must install `cv-mobile-app`'s dependencies before running for the first time:

```
$ npm install
```

## Start
To spin up a development server, run the following command:

```
$ npm run local
```

A development server will now be running at `localhost:8080`

## Test
To test the code for any syntax issues, run the following command to ask `standard` to parse the code for any errors:

```
$ npm run test
```

## Build
To build the final application, run the following:

```
$ npm run build
```

A self-contained and optimised version of the application will now be available in the `public/dist` folder.

## License
GPL-3.0
