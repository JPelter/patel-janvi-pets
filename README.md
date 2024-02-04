# Pet Service Storefront
A website to display information about pet service offerings as well as provide an interface for customers to chat and book appointments.

# Introduction
The code for this project is stored in GitHub. There is a React website, a Python Flask API, Postgres database, and MinIO-S3. The first two have Docker build information included, the latter two use public images from the Dockerhub. Everything is deployed to common namespace of Kubernetes cluster in Azure. The continuous build and release is handled by Azure Dev Ops agents.

The repo contains YAML that created the Kubernetes namespace and service account to administer the namespace.

# React Frontend
Multi-stage docker build with node then nginx.
| Environment | Cluster Host | Internet Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:3000 |
| DEV | http://pets-dev-website.pets.svc.cluster.local:80 | https://pets-dev.pelter.net/ |
| PROD | http://pets-website.pets.svc.cluster.local:80 | https://pets.pelter.net/ |

# Python Flask API
Notice that the internet URL matches the frontend client, the path /api is present for all API endpoints. When running this locally, environment variables must be provided some way.

| Environment | Cluster Host | External Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:8080 |
| DEV | http://pets-dev-api.pets.svc.cluster.local:8080 | https://pets-dev.pelter.net/api |
| PROD |  http://pets-api.pets.svc.cluster.local:8080 | https://pets.pelter.net/api |


# Storage Servers
There are two stateful applications in this project: a Postgres database and MinIO-S3. To save money and node volume mount slots, these applications share a persistent volume claim by using subpath feature of mounting. So these containers run side-by-side in the same pod and can be reached using a common service name, but differing ports.

Rather than running and priming these docker images locally, you could use use port-forwarding with kubectl to target Kubernetes resources as if their were local services.
## Postgres
| Environment | Cluster Host | External Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:5432 |
| DEV | http://storage-dev-website.pets.svc.cluster.local:5432 | N/A |
| PROD | http://storage-website.pets.svc.cluster.local:5432 | N/A |
## MinIO
### Console
| Environment | Cluster Host | External Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:9001 |
| DEV | http://storage-dev-website.pets.svc.cluster.local:9001 | N/A |
| PROD | http://storage-website.pets.svc.cluster.local:9001 | N/A |
### API
| Environment | Cluster Host | External Host |
| ----------- | ----------- | ----------- |
| LOCAL | N/A | http://localhost:9000 |
| DEV | http://storage-dev-website.pets.svc.cluster.local:9000 | N/A |
| PROD | http://storage-website.pets.svc.cluster.local:9000 | N/A |

#tst