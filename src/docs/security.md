# Security

## Zabezpečení před nepřihlášeným uživatelem
Ke každé akci v controlleru přidat anotaci:
1) `@Secured(<výčet rolí>)`, to znamená např. @Secured("ADMIN") (viz https://docs.spring.io/spring-security/site/docs/5.0.2.RELEASE/api/org/springframework/security/access/annotation/Secured.html)
2) `@PreAuthorize("isAnonymous()")`, @PreAuthorize("hasRole('USER')") (viz https://docs.spring.io/spring-security/site/docs/5.0.2.RELEASE/reference/htmlsingle/#access-control-using-preauthorize-and-postauthorize)
3) `@RolesAllowed("ADMIN")`

## Přihlášení

### Request
viz `com.liquorexchange.payload.LoginRequest`

`POST http://localhost:8080/api/auth/signin`
```json
{
    "username": "test",
    "password": "test123"
}
```

### Response
```json
{
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTU3MDQ4NTY4LCJleHAiOjE1NTc2NTMzNjh9.5ziVCKYpatxjpfgi1t8C-0eQHxml7iod76P78oM6ie5IfPIYWCIZIizXAy3a1nGuJ3gfBrxLIo2YgwIAEu-vTQ",
    "tokenType": "Bearer"
}
```

## Registrace

### Request
viz `com.liquorexchange.payload.SignUpRequest`

`POST http://localhost:8080/api/auth/signup`
```json
{
    "username": "test",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "Test",
    "password": "test123"
}
```

### Response
```json
{
    "success": true,
    "message": "Registration successful."
}
```

## Autorizace
ke každému jinému requestu je nutné přidat **hlavičku** `Authorization: Bearer <token>` (`<token>` je `accessToken` získaný z login requestu), např: `Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTU3MDQ4NTY4LCJleHAiOjE1NTc2NTMzNjh9.5ziVCKYpatxjpfgi1t8C-0eQHxml7iod76P78oM6ie5IfPIYWCIZIizXAy3a1nGuJ3gfBrxLIo2YgwIAEu-vTQ`

```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTU3MDQ4NTY4LCJleHAiOjE1NTc2NTMzNjh9.5ziVCKYpatxjpfgi1t8C-0eQHxml7iod76P78oM6ie5IfPIYWCIZIizXAy3a1nGuJ3gfBrxLIo2YgwIAEu-vTQ
```