import errorLogMessage from "./messages/error-log-message";
import infoLogMessage from "./messages/info-log-message";

export const logger = (req: any, res: any, next: any) => {
  
  var oldWrite = res.write
  var oldEnd = res.end
  var chunks: any[] = []

  res.write = function (chunk: any) {
    chunks.push(Buffer.from(chunk))
    oldWrite.apply(res, arguments)
  }
  res.end = function (chunk: any) {
    if (chunk)
      chunks.push(Buffer.from(chunk))
    const responseBody = Buffer.concat(chunks).toString('utf8')
    processLog(req, res, responseBody)
    oldEnd.apply(res, arguments)
  }
  next()
}

function processLog (req: any, res: any, responseBody: any) {
  if ( res.statusCode < 400 ) {
    infoLogMessage(req.method, req.originalUrl, res.statusCode, req.headers[`${process.env.HEADER_TIME_RESPONSE}`], responseBody, req.headers.host)
    return
  }
  errorLogMessage(req.method, req.originalUrl, res.statusCode, req.headers[`${process.env.HEADER_TIME_RESPONSE}`], responseBody, req.headers.host)
}
