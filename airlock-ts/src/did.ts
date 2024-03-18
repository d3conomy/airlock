import didJWT from 'did-jwt'

export async function verifyJWT(jwt: string, resolver: any) {
  return didJWT.verifyJWT(jwt, { resolver })
}
