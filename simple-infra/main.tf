# Bucket to store the website
resource "google_storage_bucket" "my_bucket" {
  name          = "photo-portfolio-bucket"
  location      = var.gcp_region
  force_destroy = true # Allows the bucket to be deleted even if it contains objects

  uniform_bucket_level_access = false # Optional: to manage bucket permissions uniformly

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  # Optional: If you need to set lifecycle rules, versioning, etc.
  versioning {
    enabled = false
  }

  lifecycle {
    prevent_destroy = false # Optional: Set to true to prevent accidental deletion
  }
}

# Upload all static files from the "out" folder to the bucket
resource "google_storage_bucket_object" "my_website_files" {
  for_each = fileset("../website-next-static/out", "**/*") # Upload all files from the "out" folder
  name     = each.value
  source   = "../website-next-static/out/${each.value}"
  bucket   = google_storage_bucket.my_bucket.name
}


# Make all uploaded files publicly accessible
resource "google_storage_object_access_control" "public_rule" {
  for_each = google_storage_bucket_object.my_website_files
  bucket   = google_storage_bucket.my_bucket.name
  object   = each.value.name
  role     = "READER"
  entity   = "allUsers"
}
