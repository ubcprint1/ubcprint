module.exports = {
  apps: [{
    name: 'ubcprint',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/ubcprint',
    env: { NODE_ENV: 'production', PORT: '3000' }
  }]
}
