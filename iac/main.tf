terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws",
            version = "~> 5.0"
        }
    }

    required_version = ">= 1.3.0"
}

provider "aws" {
    profile = "tinyroosters"
}

resource "aws_s3_bucket" "s3" {
    bucket = "tiny-roosters-site-s3"
    tags = {
        Name        = "tiny-roosters-site-s3"
        Environment = "Dev"
    }
}

resource "aws_cloudfront_origin_access_control" "oac" {
    name                              = "S3-OAC-${aws_s3_bucket.s3.bucket}"
    description                       = "OAC for CloudFront to access ${aws_s3_bucket.s3.bucket}"
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
}

resource "aws_s3_bucket_policy" "s3_policy" {
    bucket = aws_s3_bucket.s3.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
        Effect = "Allow"
        Principal = {
            Service = "cloudfront.amazonaws.com"
        }
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::${aws_s3_bucket.s3.bucket}/*"
        Condition = {
            StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
            }
        }
        }]
    })
}

resource "aws_cloudfront_distribution" "cdn" {
    origin {
        domain_name              = aws_s3_bucket.s3.bucket_regional_domain_name
        origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
        origin_id                = "S3-${aws_s3_bucket.s3.bucket}"
    }

    enabled             = true
    default_root_object = "index.html"

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "S3-${aws_s3_bucket.s3.bucket}"

        viewer_protocol_policy = "redirect-to-https"

        forwarded_values {
            query_string = false
            cookies {
                forward = "none"
            }
        }
    }

    restrictions {
        geo_restriction {
            restriction_type = "blacklist"
            locations        = ["RU", "CN"]
        }
    }

    viewer_certificate {
        cloudfront_default_certificate = true
    }
}

data "aws_route53_zone" "hosted_zone" {
    name = var.domain_name
}

resource "aws_route53_record" "cdn" {
    zone_id = data.aws_route53_zone.hosted_zone.zone_id
    name    = var.domain_name
    type    = "A"

    alias {
            name                   = aws_cloudfront_distribution.cdn.domain_name
            zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
            evaluate_target_health = false
    }
}

