module.exports = {
  apps: [
    {
      name: 'api',
      script: './api.js',
      node_args: '--tls-min-v1.0'
    }
  ]
}