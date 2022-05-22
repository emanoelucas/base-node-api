export default (method: string, url: string, status: number, startTime: number, response: any, host?: string) => {
  console.log(`[ERROR] "${method}" request to "${host}${url}" failed, response code: "${status}", response time: "${Date.now()-Number(startTime)}" ms. ${new Date().toLocaleString()} `
  )
  console.log('response:', response)
}