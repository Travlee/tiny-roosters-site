<p align="center">
  <img src="static/images/character_logo_primary.svg" alt="TR Character Logo" width="128" height="128" />
</p>

<h1 align="center">TinyRoosters.com</h1>

<p align="center">
  <b>Tiny Roosters Game Studio - Site</b>
</p>

<a href="https://tinyroosters.com" target="_blank" rel="noopener noreferrer">**Tiny Roosters**</a> is my attempt at independent game development. Built with [Hugo](https://gohugo.io/) as I really did not want nor need a backend, and because I wanted to finish this fast so I can focus on what I actually like doing - which is not webdesign. Also, Hugo is super neat.

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

## Purpose

The site serves as a hub for:
- **Games & Projects**
- **Updates**
- **Process docs**
- **Maybe more**

## License

See the [LICENSE](LICENSE) file for details.
