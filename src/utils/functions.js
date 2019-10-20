function getFileType(str) {
  let type = str.split('.')

  return type[1].toLowerCase()
}

function getFileName(str) {
  let name = str.split('/')

  return name[name.length - 1]
}

function getFolderName(str) {
  let name = str.split('/')

  return name[name.length - 2]
}

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function getFiles(results) {
  let files = []

  let url = 'https://sacmyit001.blob.core.windows.net/blbmyit001/'

  for (let i = 0; i < results.entries.length; i++) {
    files.push({
      name: getFileName(results.entries[i].name),
      fullName: results.entries[i].name,
      type: getFileType(results.entries[i].name),
      path: url + results.entries[i].name,
      size: bytesToSize(results.entries[i].contentLength)
    })
  }

  return files
}

/**
 * get folders from a prefix
 * @param  {object} response 
 * @return {array}
 */
function getFolders(response) {
  let data = response.body.EnumerationResults.Blobs
  let folders = []

  if (Array.isArray(data.BlobPrefix)) {
    for (var i = 0; i < data.BlobPrefix.length; i++) {
      folders.push({
        name: getFolderName(data.BlobPrefix[i].Name),
        fullName: data.BlobPrefix[i].Name,
        type: 'folder',
        path: data.BlobPrefix[i].Name
      })
    }

    return folders
  }

  return folders
}
 
function getList(results, response) {
  return getFiles(results).concat(getFolders(response))
}

export default {
  getFiles: getFiles,
  getFolders: getFolders,
  getList: getList,
  getFileType: getFileType,
  getFileName: getFileName,
  getFolderName: getFolderName
}