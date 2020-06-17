## 1. Polecenia kubectl
``
kubectl get {pods, service, namespace, rs, deployments} --all-namespaces
``

``
kubectl replace -f rs-definition.yml
``

``
kubectl scale --replicas=6 -f rs-definition.yml
``

``
kubectl scale --replicas=6 replicaset myapp-replicaset
``

``
kubectl config set-context $(kubectl config current-context) --namespace={dev, default, prod}
``

``
kubectl apply -f definition.yml
``

``
kubectl describe {service, pod, } name
``

``
kubectl delete all --all
``

## 2. Uruchomienie aplikacji

```
kubectl apply -f rs-definition.yml
kubectl apply -f ns-definition.yml
kubectl apply -f service-definition.yml
```

```
minikube ip
```
lub
``
./run.sh
``

### Dzialanie aplikacji
``
172.17.0.2:30009/
``

Output: 3 różne liczby


