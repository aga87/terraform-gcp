# Terraform with GCP


## infra

• **Cloud DNS**: Manages and resolves domain names to IP addresses for your infrastructure, enabling users to access services using easy-to-remember domain names.

• **Cloud CDN**: Speeds up content delivery by caching static assets at Google’s edge locations, reducing latency and improving performance globally.

• **Cloud Load Balancing**: Distributes incoming traffic across multiple backends (e.g., servers, buckets) to ensure reliability, scalability, and efficient resource utilization.

• **Cloud Storage**: Provides scalable, durable storage for static content like images, videos, and website files, accessible directly or via other services.


## simple-infra 

• **Cloud DNS**: Manages and resolves domain names to IP addresses for your infrastructure, enabling users to access services using easy-to-remember domain names.

• **Cloud Storage**: Provides scalable, durable storage for static content like images, videos, and website files, accessible directly or via other services.



1. Update Next.js code / add images

2. Build the static website

```shell
npm run build
```

3. Deploy using Terraform

```shell
terraform plan
terraform apply
```

