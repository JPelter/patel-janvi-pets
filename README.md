# patel-janvi-pets
A website to display information about pet service offerings as well as provide an interface for customers to chat and book appointments.

# Introduction
The code for this project is stored in GitHub. There is a React website, a Python Flask API, Postgres database, and Minio-S3. The first two have Docker build information included, the latter two use public images from the Dockerhub. Everything is deployed to common namespace of Kubernetes cluster in Azure. The continuous build and release is handled by Azure Dev Ops agents.

The repo contains YAML that created the Kubernetes namespace and service account to administer the namespace.

# React Frontend
Multi-stage docker build with node then nginx.
| Environment | Cluster Host | Internet Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:3000 |
| DEV | http://pets-dev-website.pets.svc.cluster.local:80 | https://pets-dev.mtcloud.pelter.net/ |
| PROD | http://pets-website.pets.svc.cluster.local:80 | https://pets.mtcloud.pelter.net/ |

# Python Flask API
Notice that the internet URL matches the frontend client, the path /api is present for all API endpoints.
| Environment | Cluster Host | Internet Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:8080 |
| DEV | http://pets-dev-api.pets.svc.cluster.local:8080 | https://pets-dev.mtcloud.pelter.net/api |
| PROD |  http://pets-api.pets.svc.cluster.local:8080 | https://pets.mtcloud.pelter.net/api |