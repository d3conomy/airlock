# Airlock [TypeScript Package]

> Auth client built on top on Moonbase API leveraging the IPFS p2p network and OrbitDb.


## Design

Airlock uses OrbitDb to create an authentication system in a decentralized manner.

### Components

* **Logging DB**: A log of all the authentication requests and responses.
* **User DB**: A database of all the users and their public keys.
* **Token DB**: A database of all the tokens and their expiration times.

### Authentication Flow

1. **User Registration**: A user registers with the system by providing a username and a public key. The public key is stored in the User DB.
2. **User Login**: A user logs in by providing a username and a signature of the current time. The signature is verified using the public key stored in the User DB. If the signature is valid, a token is generated and stored in the Token DB.
3. **Token Verification**: A token is verified by checking if it exists in the Token DB and if it has not expired.

### Logging

All the authentication requests and responses are logged in the Logging DB. This is useful for debugging and auditing purposes.

## Usage

### Installation

```bash
npm install airlock-js
```