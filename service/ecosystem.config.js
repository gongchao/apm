module.exports = {
  apps: [
    {
      name: 'service',

      script: 'dist/main.js',

      node_args: '-r ./tsconfig-paths-bootstrap.js',

      instances: 1,

      autorestart: true,

      watch: false,
    },
  ],
};
