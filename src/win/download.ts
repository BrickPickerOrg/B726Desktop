const request = require('request')
const fs = require('fs')

export function downloadFile(fileUrl: string, targetPath: string) {
  let receivedBytes = 0
  let totalBytes = 0

  let req = request({
    method: 'GET',
    uri: fileUrl,
  })
  console.log(fs)

  let out = fs.createWriteStream(targetPath)
  req.pipe(out)

  req.on('response', (data: any) => {
    totalBytes = parseInt(data.headers['content-length'])
  })

  req.on('data', (chunk: any) => {
    receivedBytes += chunk.length
    showProgress(receivedBytes, totalBytes)
  })
  req.on('end', function() {
    alert('File succesfully downloaded')
  })
}

function showProgress(received: any, total: any) {
  var percentage = (received * 100) / total
  console.log(
    percentage + '% | ' + received + ' bytes out of ' + total + ' bytes.'
  )
}
