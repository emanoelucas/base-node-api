import cors from 'cors'

const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
export default cors(corsOptions)