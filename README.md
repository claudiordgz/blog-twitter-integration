# Blog Twitter Integration

### Framework

This project is a **Serverless Framework Component**. It uses Webpack to handle the `src` code.

Code is bundled into `lib/bundle.js` and used by `lib/index.js`. 

### Installing 

`npm install`

### Testing

Testing is done in [tape](https://github.com/substack/tape) and to run them use `npm run test`.

### Environment Configuration

Environment is dynamically imported from `process.env.NODE_ENV`, to create my config I do:

```
.
+-- _config.yml
+-- src
|   +-- config
|   |   +-- config.js (entry point for configurations)
|   |   +-- env
|   |   |   +-- development.js
|   |   |   +-- production.js
|   |   |   +-- test.js
|   +-- main.js
|   +-- ...
|   +-- test
|   |   +-- ...
```

### Building the `src` code

I use Webpack locally so after doing `npm install` do:

  - `node_modules/.bin/webpack` 
    **or** 
  - `node_modules/.bin/webpack --watch` to develop continuously
    
### Running

To run use either deploy using `slss dash deploy` or run locally using 
`slss function run twitter-integration/latest-tweets`.
