#!/bin/bash
minikubeIp=$(minikube ip)
curl $minikubeIp:30009/
echo
curl --header "Content-Type: application/json" --request POST --data '{"number":5}' $minikubeIp:30009/
echo
curl --header "Content-Type: application/json" --request POST --data '{"number":7}' $minikubeIp:30009/
echo
curl $minikubeIp:30009/result