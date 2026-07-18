'use server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import env from 'env-var';
//2 hours
const expiresIn = 1000 * 60 * 60 * 2;

const loginCookieNameClient = env.get('LOGIN_COOKIE_NAME').required().asString();
const loginCookieAdmin = env.get('LOGIN_COOKIE_ADMIN').required().asString();
const encodedKey = [
  new TextEncoder().encode(env.get('TEXT_TOKEN_SECRET').required().asString()),
  new TextEncoder().encode(env.get('ADMIN_TEXT_TOKEN_SECRET').required().asString()),
];
//cookies
export async function createLoginSession(token: string, isEncode: 'admin' | 'user') {
  // 'use server';
  const expires = new Date(Date.now() + expiresIn);
  const cookieStore = await cookies();
  cookieStore.set(isEncode === 'user' ? loginCookieNameClient : loginCookieAdmin, token, {
    secure: true,
    httpOnly: true,
    expires,
  });
}

//criar uma função que valida e redireciona(talvez transforma essas função em métodos de uma classe)
export async function verifyLoginSession(isEncode: 'admin' | 'user') {
  // 'use server';
  const cookieStore = await cookies();
  const token = cookieStore.get(isEncode === 'user' ? loginCookieNameClient : loginCookieAdmin);
  if (!token) return false;
  return verifyTokenJwt(token.value, isEncode);
}

//token
export async function createTokenJwt(id: string) {
  return await new SignJWT({ id })
    .setExpirationTime(Date.now() + expiresIn)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .sign(encodedKey[0]);
}
export async function createTokenJwtAdmin(email: string) {
  return await new SignJWT({ email })
    .setExpirationTime(Date.now() + expiresIn)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .sign(encodedKey[1]);
}
export async function verifyTokenJwt(token: string, encode: 'admin' | 'user') {
  try {
    const { payload } = await jwtVerify(token, encode === 'user' ? encodedKey[0] : encodedKey[1], {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return false;
  }
}
