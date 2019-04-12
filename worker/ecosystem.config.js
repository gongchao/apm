module.exports = {
  apps: [
    {
      name: 'log-worker',

      script: 'dist/main.js',

      instances: 1,

      autorestart: true,

      watch: false,

      env: {
        DEBUG: 'Reader'
      },
    },
  ],
};
