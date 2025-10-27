import jwt
import datetime
import argparse


def generate_jwt(sub, scope, secret, alg="HS256", iat=None, exp=None):
    """Generate a self-signed JWT with the given claims."""

    iat = iat or datetime.datetime.utcnow()
    exp = exp or (iat + datetime.timedelta(hours=24))

    payload = {"sub": sub, "scope": scope, "iat": iat, "exp": exp, "iss": "self-signed"}

    token = jwt.encode(payload, secret, algorithm=alg)
    return token


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a self-signed JWT.")
    parser.add_argument("--sub", required=True, help="Subject of the token")
    parser.add_argument("--scope", required=True, help="Space-separated list of scopes")
    parser.add_argument(
        "--secret", required=True, help="Secret key for signing the token"
    )
    parser.add_argument(
        "--alg", default="HS256", help="Signing algorithm (default: HS256)"
    )

    args = parser.parse_args()

    token = generate_jwt(args.sub, args.scope, args.secret, args.alg)
    print(token)

