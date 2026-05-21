console.log(`
GitHub blocks Mapbox tokens from the gh-pages git branch (push protection).

Deploy using GitHub Actions instead:

  1. Repo → Settings → Secrets and variables → Actions
     Add secret: VITE_MAPBOX_ACCESS_TOKEN = your Mapbox pk. token

  2. Repo → Settings → Pages → Build and deployment
     Source: GitHub Actions  (required — workflow fails with "Get Pages site failed" without this)

     Direct link:
     https://github.com/matthewdo823-ui/Black-Access-to-Art-in-SF/settings/pages

  3. Commit from the REPO ROOT (Cluster HW — parent of fillmore-exhibit), not from fillmore-exhibit/:

     cd ..
     git add .github/ fillmore-exhibit/
     git commit -m "Deploy via GitHub Actions"
     git push

     Or run: npm run deploy:commit   (from fillmore-exhibit — stages the right paths for you)

The workflow builds fillmore-exhibit and publishes without pushing secrets
to the gh-pages branch.

Optional: delete the old gh-pages branch on GitHub if it exists
(Branches → gh-pages → Delete) — it may contain a leaked token in history.

Site URL: https://matthewdo823-ui.github.io/Black-Access-to-Art-in-SF/
`)
