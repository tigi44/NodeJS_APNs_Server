module.exports = {
  apps : [{
    name      : 'NodeJSAPNsServer',
    script    : './bin/www',
    env: {
      FORCE_COLOR: 1,
      PORT: 3000,
      NODE_ENV: 'development'
    },
    env_production : {
      FORCE_COLOR: 1,
      PORT: 80,
      NODE_ENV: 'production'
    }
  }]
};
