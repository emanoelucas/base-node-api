export default (method: string, url: string, status: number, message: string, startTime: number, host?: string) => {
  return `"${method}" request to "${host}${url}" failed, response code: "${status}", response message: ${message}, response time: "${Date.now()-startTime}" ms`
}