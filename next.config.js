/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['yeyeproductimages.s3.amazonaws.com','lh3.googleusercontent.com']
      },
}

// next.config.js
const withVideos = require('next-videos')

module.exports = withVideos()

module.exports = nextConfig
