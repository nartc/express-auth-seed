# express-auth-seed
Starter pack for Node Express and Mongo backend using Passport-JWT

# Configurable Variables
- Port number in `app.js` (Default: 1110)
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

# Response Data Format
```js
{
  success: boolean,
  title: string,
  message: string,
  error?: Error | Object,
  response?: [Response-Type]
}
```
- The format will help you to have a general format to make your front-end application stays consistent with checking the response from any API calls. 

# Example in Angular:
```ts
import { User } from 'path/models/User.ts';

export interface IUserResponse {
  success: boolean,
  title: string,
  message: string,
  error?: Error,
  response?: User
}
```

Or create a general interface 
```ts
export interface IDataResponse {
  success: boolean,
  title: string,
  message: string
  error?: Error
}
```

then `implements IDataResponse` for your other interfaces 
```ts
import { User } from 'path/models/User.ts';
import { Product } from 'path/models/Product.ts';

import { IDataResponse } from 'path';

export interface IUserResponse implements IDataResponse {
  response: User;
}

export interface IProductResponse implements IDataResponse {
  response: Product;
}
```

and implementation in NotificationService: 
```ts
showSuccess(data: IUserResponse) {
  //do stuff with `data`
}
```
