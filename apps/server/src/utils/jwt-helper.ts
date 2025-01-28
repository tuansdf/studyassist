import { decodeJwt, JWTPayload, jwtVerify, SignJWT } from "jose";
import { Env } from "../constants/env.js";

const secret = new TextEncoder().encode(Env.JWT_SECRET);
const signHeader = { alg: "HS256" };
const verifyOptions = { algorithms: ["HS256"] };

class JWTHelper {
  public async decode(toBeDecoded: string) {
    return decodeJwt(toBeDecoded);
  }
  public async sign(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload).setProtectedHeader(signHeader).sign(secret);
  }
  public async verify(toBeVerified: string): Promise<JWTPayload> {
    const verified = await jwtVerify(toBeVerified, secret, verifyOptions);
    return verified.payload;
  }
}

export const jwtHelper = new JWTHelper();
