export default (method: string, url: string, status: number, startTime: number, response: any, host?: string) => {
  console.log(`[INFO] "${method}" request to "${host}${url}" succeed, response code: "${status}", response time: "${Date.now()-Number(startTime)}" ms. ${new Date().toLocaleString()}`, '\n', 'response:', response)
}