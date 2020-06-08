## Aplikacja NWD (Docker)
### Funkcjonalność
Aplikacja po wywołaniu ``localhost:9090/:number1/:number2`` zwraca NWD
### Co nowego
1. docker-compose.yml
Użycie polityki ``restart``, która definiuje kiedy aplikacja ma wykonać restart.
* "no"
* always
* on-failure
* unless-stopped

https://docs.docker.com/compose/compose-file/#restart

2. Redis
Wykorzystanie cache do przechowywania wcześniej obliczonej wartości NWD. Nie wymaga ona wtedy ponownego wyliczania, tylko pobierana jest z cache.