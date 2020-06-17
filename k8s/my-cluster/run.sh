#!/bin/bash
kubectl apply -f redis-service-clusterip.yml
kubectl apply -f postgres-service-clusterip.yml
kubectl apply -f service-nodeport.yml

kubectl apply -f postgres-configMap.yml
kubectl apply -f myapp-configMap.yml

kubectl apply -f myapp-secret.yml

kubectl apply -f redis-deployment.yml
kubectl apply -f postgres-deployment.yml
kubectl apply -f backend-deployment.yml