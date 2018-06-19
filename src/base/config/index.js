const devConfig = {
  protocol: 'http',
  host: 'localhost',
  port: 7001
};

const proConfig = {
  protocol: 'http',
  host: '45.77.211.183',
  port: 4399
};

const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig;

export default config;
