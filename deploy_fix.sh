#!/bin/bash
export PATH=$PWD/node-v20.11.0-linux-x64/bin:$PATH
echo "Using npm: $(which npm)"

# Configure git user for gh-pages commit
git config user.email "sjlee10@users.noreply.github.com"
git config user.name "sjlee10"

echo "Cleaning up..."
rm -rf node_modules package-lock.json
echo "Installing dependencies..."
npm install
echo "Installing gh-pages..."
npm install gh-pages --save-dev
echo "Building and Deploying..."
npm run deploy
