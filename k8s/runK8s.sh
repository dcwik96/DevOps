#!/bin/bash

sudo chmod 666 /var/run/docker.sock
minikube start --driver=docker
minikube status