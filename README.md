# patel-janvi-pets
A website to display information about pet service offerings as well as provide an interface for customers to chat and book appointments.

# Introduction
The code for this project is stored in GitHub. There is a React website, a Python Flask API, Postgres database, and Minio-S3. The first two have Docker build information included, the latter two use public images from the Dockerhub. Everything is deployed to common namespace of Kubernetes cluster in Azure. The CI/CD is handled by Azure Dev Ops agents.

The repo contains YAML that created the Kubernetes namespace and service account to administer the namespace.

# React Frontend

Just the 'Hello World' app. Multi-stage docker build with node then nginx.