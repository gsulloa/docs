# Koa - web
---
## Paquetes útiles

- **Modelo**: [koa-orm/sequelize](https://github.com/d-band/koa-orm)
- **Vista**: [EJS](http://ejs.co/), [PUG](https://pugjs.org/api/getting-started.html), [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Controlador**: []()
- **Router**: [koa-router]()

## Hello World

```sh
yarn init
nano package.json
yarn add koa
```
```js
// index.js
const Koa = require('koa');
const app = new Koa();
app.use((ctx) => ctx.body = 'hello world');
app.listen(3000);
```
```sh
node index.js
```

