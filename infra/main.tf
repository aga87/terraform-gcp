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
