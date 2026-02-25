import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import env from 'env-var';
//2 hours
const expiresIn = 1000 * 60 * 3;

const loginCookieName = env.get('LOGIN_COOKIE_NAME').required().asString();
const encodedKey = new TextEncoder().encode(env.get('TEXT_TOKEN_SECRET').required().asString());
//cookies
export async function createLoginSession(token: string) {
  // 'use server';
  const expires = new Date(Date.now() + expiresIn);
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, token, {
    secure: true,
    httpOnly: true,
    expires,
  });
}

//criar uma função que valida e redireciona(talvez transforma essas função em métodos de uma classe)
export async function verifyLoginSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(loginCookieName);
  if (!token) return false;
  return verifyTokenJwt(token.value);
}

//token
export async function createTokenJwt({ id }: { id: string }) {
  return await new SignJWT({ id })
    .setExpirationTime(Date.now() + expiresIn)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .sign(encodedKey);
}
export async function verifyTokenJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return false;
  }
}
