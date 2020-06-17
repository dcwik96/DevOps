#!/bin/bash
kubectl apply -f rs-definition.yml
kubectl apply -f ns-definition.yml
kubectl apply -f service-definition.yml

minikubeIp=$(minikube ip)

for i in {1..20}
do
    curl $minikubeIp:30009/
    echo
done