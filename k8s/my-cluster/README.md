## 1. Uruchomienie aplikacji
### 1.1. Obraz Docker z aplikacją backend
```
docker build -t greek96/mybackend .
docker push
```

### 1.2. Apply definicji kubernetes
#### a) service
```
kubectl apply -f redis-service-clusterip.yml
kubectl apply -f postgres-service-clusterip.yml
kubectl apply -f service-nodeport.yml
```
#### b) configmap
```
kubectl apply -f postgres-configMap.yml
kubectl apply -f myapp-configMap.yml
```
#### c) secret
```
kubectl apply -f myapp-secret.yml
```
#### d) deployment
```
kubectl apply -f redis-deployment.yml
kubectl apply -f postgres-deployment.yml
kubectl apply -f backend-deployment.yml
```

### 1.3. Działanie aplikacji
```
minikube ip
```

```
GET 172.17.0.2:30009/
```
Output:
Hello from my backend

```
GET 172.17.0.2:30009/result
```
Output:
Wyniki zapisane w bazie Postgres

```
POST 172.17.0.2:30009/

JSONBody: 
{
	"number":5
}
```
Output: (obliczona silnia)
```
{
    "liczba": 5,
    "wynik": 120
}
```

## 2. Opis
Aplikacja składa się z 3 replik backend, 2 replik redis (cache), 1 postgres

Parametry przekazywane do aplikacji backend:
* REDIS_HOST oraz REDIS_PORT jako env w backend-deployment
* INIT_MESSAGE jako parametr configMapKeyRef z configMap
* PGPASSWORD w formie zakodwanej w definicji secret
