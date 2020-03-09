export interface JwtResponseInterface {
  dataUser: {
    id: number,
    name: string,
    email: string,
    accessToken: string,
    expiresIn: string
  }
}
