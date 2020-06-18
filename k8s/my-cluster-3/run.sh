#!/bin/bash
minikube addons enable ingress

kubectl apply -f redis-service-clusterip.yml
kubectl apply -f postgres-service-clusterip.yml
kubectl apply -f service-clusterip.yml

kubectl apply -f local-storageclass.yml
kubectl apply -f postgres-pvc.yml
kubectl apply -f persistent-volume1.yml

kubectl apply -f postgres-configMap.yml
kubectl apply -f myapp-configMap.yml

kubectl apply -f myapp-secret.yml

kubectl apply -f redis-deployment.yml
kubectl apply -f postgres-deployment.yml
kubectl apply -f backend-deployment.yml

kubectl apply -f frontend-service-clusterip.yml
kubectl apply -f frontend-deployment.yml

kubectl apply -f ingress.yml