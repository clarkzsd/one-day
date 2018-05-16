import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoListScreen from './screens/TodoListScreen';

const app = new Koa();

app.use(serve(path.resolve(__dirname, '../public')));

app.use(async ctx => {
  const context = {};
  const jsx = (
    <Provider store={store}>
      <StaticRouter context={context} location={ctx.req.url}>
        <TodoListScreen />
      </StaticRouter>
    </Provider>
  );

  const reactDom = ReactDOMServer.renderToString(jsx);
  const reduxState = store.getState();
  ctx.res.writeHead(200, {'Content-Type': 'text/html'});
  ctx.body = htmlTemplate(reactDom, reduxState);
});

app.listen(3000);

const spinnerStyle = `
  #loading-spinner>div {
    position: relative;
    box-sizing: border-box;
  }
  #loading-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: block;
    font-size: 0;
    color: #03A9F4;
    width: 72px;
    height: 72px;
  }
  #loading-spinner>div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
    position: absolute;
    top: 0;
    left: 0;
    width: 72px;
    height: 72px;
    border-radius: 100%;
    opacity: .5;
    -webkit-animation: loading-spinner 2s infinite ease-in-out;
    -moz-animation: loading-spinner 2s infinite ease-in-out;
    -o-animation: loading-spinner 2s infinite ease-in-out;
    animation: loading-spinner 2s infinite ease-in-out;
  }
  #loading-spinner>div:last-child {
    -webkit-animation-delay: -1.0s;
    -moz-animation-delay: -1.0s;
    -o-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  @keyframes loading-spinner {
    0%,
    100% {
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
  }
`;

function htmlTemplate (reactDom, reduxState) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400|Material+Icons" rel="stylesheet">
          <link rel="stylesheet" href="./style.css"/>
          <title>One Day</title>
        </head>
        <body>
          <div id="app">${reactDom}</div>
          <style>${spinnerStyle}</style>
          <div id="loading-spinner"><div></div><div></div></div>
          <script>window.REDUX_DATA = ${JSON.stringify(reduxState)}</script>
          <script src="./bundle.js"></script>
        </body>
      </html>
  `;
}
