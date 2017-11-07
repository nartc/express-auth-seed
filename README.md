# express-auth-seed
Starter pack for Node Express and Mongo backend using Passport-JWT

# Configurable Variables
- Database Name and Secret Key in `keys-dev.js`
- UserSchema in `User.js`

# Installation steps
- Clone the repo
- Run `npm install` to install all the dependencies
- Optional: install `nodemon` with `npm install -g nodemon` 
- Run `nodemon` or `npm start` in the directory. 

# Integration steps for Angular
- Make sure you have installed `Angular-CLI` with `npm install -g @angular/cli`
- In the directory, run `ng new [angular-src] --skip-git --skip-commit`. This is to make sure you can use the same repo for both backend and frontend.
- After the Angular has been generated, go in `.angular-cli.json` and make sure the `outDir` is set to `../build`
