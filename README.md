# Sakura Portfolio

Animated Japanese-inspired portfolio website featuring certifications, learning
progress, projects, skills, resume, and contact information.

## Run locally

Open `index.html` in a browser. The site is static and does not require a build
step.

## Publish to GitHub

Create an empty public repository named `sakura-portfolio` under the GitHub
account `Prasad29113004`. Do not add a README, `.gitignore`, or license on the
GitHub creation screen because this folder already contains its first commit.

Then run:

```powershell
git push -u origin main
```

Git Credential Manager may open a browser the first time so GitHub can authorize
the push.

## Deploy with Azure App Service

1. In Azure Portal, create an **App Service > Web App**.
2. Choose **Code**, **Windows**, and a supported runtime stack.
3. After creation, open **Deployment Center**.
4. Select **GitHub** as the source and authorize the GitHub account.
5. Choose `Prasad29113004`, the `sakura-portfolio` repository, and `main`.
6. Save. Azure creates a GitHub Actions workflow and deploys the site.

Every later push to `main` triggers a new Azure deployment automatically.

## Future updates

Open this same project folder in Codex and request the change, including
"commit and push it to GitHub." Codex can edit and verify the site, then push
the new commit. Azure will publish it after the GitHub Actions run succeeds.
