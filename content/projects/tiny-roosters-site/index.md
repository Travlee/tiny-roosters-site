+++
date = "2026-04-20T05:00:13-04:00"
title = "Tiny Roosters Site"
type = "projects"
description = "Website for Tiny Roosters. The site you are currently on. No longer missing."
draft = false

[params]
    header_image = "tinyroosters-site-404.png"
+++

## Description
The very site you are on now. The code is hosted on Github, pushed to S3, then finally spread around the world via CloudFront.

> Here is a helpful shell alias I used during development `hugo server -D --disableFastRender --ignoreCache  --gc`

## Tech Stack

- **[Hugo](https://gohugo.io/)**
- **HTML5 & Vanilla CSS**
- **Vanilla JavaScript**
- **[Umami](https://umami.is/)** analytics

## Infrastructure Design

This static site is hosted and deployed using simple infra on AWS.

1.  **Storage:** Static files are hosted in an **Amazon S3** bucket.
2.  **Content Delivery:** **Amazon CloudFront** serves as the CDN with HTTPS via AWS Certificate Manager (ACM).
3.  **CI/CD:** **GitHub Actions** automates the deployment process.
    - On every push to the `release` branch, the site is built using Hugo.
    - The resulting `public/` directory is synced to the S3 bucket.
    - A CloudFront invalidation is triggered.

## Links
- [Github](https://github.com/Travlee/tiny-roosters-site)
- [This](https://tinyroosters.com)