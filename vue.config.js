module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/azure-blob-file-explorer'
    : '/'
}