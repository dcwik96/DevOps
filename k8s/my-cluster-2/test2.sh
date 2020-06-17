#!/bin/bash
kubectl delete all --all

minikubeIp=$(minikube ip)
curl $minikubeIp:30009/result

./run.sh
sleep 1m

curl $minikubeIp:30009/result