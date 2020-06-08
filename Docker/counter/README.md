## Aplikacja counter (Docker)
### Funkcjonalność
Aplikacja po wywołaniu ``localhost:9090/`` zwraca liczbę, która jest licznikiem wywołań tego endpointu.
### Co nowego
1. docker-compose.yml
Użycie polityki ``restart``, która definiuje kiedy aplikacja ma wykonać restart.
* "no"
* always
* on-failure
* unless-stopped

https://docs.docker.com/compose/compose-file/#restart

2. Redis
Wykorzystanie cache do przechowywania wartości licznika