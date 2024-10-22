name: CI Pipeline

on:
  push:
    branches:
      - main

permissions:
  contents: read
  actions: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Build step
        run: |
          echo "Building..."
          sleep 5

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy step
        run: |
          echo "Deploying..."
          sleep 5

  test:
    runs-on: ubuntu-latest
    needs: deploy
    strategy:
      matrix:
        shard: [1, 2, 3]  # Define 3 shards
    name: Test Shard ${{ matrix.shard }} of 3
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'  # Specify your Node.js version

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests with sharding
        run: |
          echo "Running tests for shard ${{ matrix.shard }} of 3"
          npx playwright test --shard=${{ matrix.shard }}/3

      - name: Upload Playwright HTML Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-html-report-shard-${{ matrix.shard }}
          path: reports/html

      - name: Upload Playwright JSON Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-json-report-shard-${{ matrix.shard }}
          path: reports/test-results.json

      - name: Upload Playwright JUnit Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-junit-report-shard-${{ matrix.shard }}
          path: reports/results.xml

      - name: Upload Screenshots (if any)
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-screenshots-shard-${{ matrix.shard }}
          path: screenshots/

      - name: Upload Videos (if any)
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-videos-shard-${{ matrix.shard }}
          path: videos/

      - name: Upload Traces (if any)
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-traces-shard-${{ matrix.shard }}
          path: traces/

  deploy-to-prod:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to Prod step
        run: |
          echo "Deploying to Production..."
          sleep 5
