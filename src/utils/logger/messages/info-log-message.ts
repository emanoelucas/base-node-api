export default (method: string, url: string, ip: string, host?: string) => {
  return `"${method}" request to "${host}${url}", client IP address: "${ip}"`
}