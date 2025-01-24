# Bucket to store the website

resource "google_storage_bucket" "my_bucket" {
  name          = "photo-portfolio-bucket"
  location      = var.gcp_region
  force_destroy = true # Allows the bucket to be deleted even if it contains objects

  uniform_bucket_level_access = false # Optional: to manage bucket permissions uniformly

  # Optional: If you need to set lifecycle rules, versioning, etc.
  versioning {
    enabled = false
  }

  lifecycle {
    prevent_destroy = false # Optional: Set to true to prevent accidental deletion
  }
}

# Make new object (website html) public
resource "google_storage_object_access_control" "public_rule" {
  bucket = google_storage_bucket.my_bucket.name
  object = google_storage_bucket_object.my_website.name
  role   = "READER"
  entity = "allUsers"
}

# Upload the html file to the bucket
resource "google_storage_bucket_object" "my_website" {
  name   = "index.html"
  source = "../website/index.html"
  bucket = google_storage_bucket.my_bucket.name
}


#	Reserve a static global IP address that can later be used for the load balancer
resource "google_compute_global_address" "my_website_ip" {
  name = "photo-portfolio-website-ip"
}


# Get the managed DNS zone (retrieves an existing DNS zone configuration from Google Cloud DNS)
data "google_dns_managed_zone" "my_dns_zone" {
  name = "photo-portfolio-zone" # the zone name as set in the Cloud DNS console
}

# DNS resolution: Create a DNS A record pointing the domain name to the static IP address reserved earlier
resource "google_dns_record_set" "my_dns_record" {
  name         = "my_dns_record.${data.google_dns_managed_zone.my_dns_zone.dns_name}"
  type         = "A" # because it is an IP address
  ttl          = 300 # seconds
  managed_zone = data.google_dns_managed_zone.my_dns_zone.name
  rrdatas = [
    google_compute_global_address.my_website_ip.address # the value that the DNS record will resolve to
  ]
}

# Backend bucket for CDN: set up a backend bucket (from Google Cloud Storage) as part of the load balancer’s backend infrastructure
resource "google_compute_backend_bucket" "my_bucket_backend" {
  name        = "photo-portfolio-bucket-backend"
  bucket_name = google_storage_bucket.my_bucket.name
  description = "Contains files needed for the website"
  enable_cdn  = true # enables Google Cloud CDN, allowing static content to be cached at the edge for faster delivery.
}

# Create HTTPS certificate 
resource "google_compute_managed_ssl_certificate" "my_certificate" {
  provider = google-beta
  project  = var.gcp_project
  name     = "photo-portfolio-website-certificate"
  managed {
    domains = [google_dns_record_set.my_dns_record.name]
  }
}

# GCP URL MAP
# Configures a URL map in Google Cloud, which defines how incoming HTTP(S) requests are routed to backend services as part of the load balancer setup 
resource "google_compute_url_map" "my_url_map" {
  name            = "photo-portfolio-url-map"
  default_service = google_compute_backend_bucket.my_bucket_backend.self_link # the default backend service to route traffic to if no specific URL rules match (here, this is the bucket that serves static assets for the website)

  # Defines host-based routing rules 
  host_rule {
    hosts        = ["*"]      # will match requests for any domain or subdomain name (wildcard) that resolves to this IP address; TODO: NOT SECURE
    path_matcher = "allpaths" # associates this host rule with a specific path_matcher named "allpaths" (defined below).
  }

  # Defines path-based routing rules for requests that match the host rule (e.g. we could have different paths for videos and images)
  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_bucket.my_bucket_backend.self_link # all incoming traffic, regardless of the path, will be routed to the backend bucket.
  }
}

# GCP HTTP Proxy
resource "google_compute_target_http_proxy" "my_http_proxy" {
  name    = "photo-portfolio-http-proxy"
  url_map = google_compute_url_map.my_url_map.self_link
}

# GCP Forwarding Rule
resource "google_compute_global_forwarding_rule" "my_forwarding_rule" {
  name                  = "photo-portfolio-forwarding-rule"
  load_balancing_scheme = "EXTERNAL"
  ip_address            = google_compute_global_address.my_website_ip.address
  ip_protocol           = "TCP"
  port_range            = "443" # we can use 80 if we don't have a SSL certificate
  target                = google_compute_target_http_proxy.my_http_proxy.self_link
}
