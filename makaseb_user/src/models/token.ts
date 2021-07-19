import { isJwtExpired } from "jwt-check-expiration";
import jwt_decode from "jwt-decode";

enum Permession {
  "Admin" = "Admin",
  "User" = "User",
  "SuperAdmin" = "SuperAdmin",
}

interface DecodedToken {
  permession: Permession;
  name: string;
  iat: number;
  exp: number;
}

export class Token {
  constructor(readonly token: string | undefined) {
    console.log("token");
    console.log(token);
  }
  isValid: boolean = this.token ? !isJwtExpired(this.token) : false;
  decoded: DecodedToken | undefined = this.token
    ? jwt_decode(this.token)
    : undefined;
}
