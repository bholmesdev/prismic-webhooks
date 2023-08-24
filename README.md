# Webhook demo - CMiniS

This is a simple demo of webhooks with a dummy CMS and a dummy static site builder. Built on [Deno](https://deno.com/) and deployable to [Railway](https://railway.app).

## Architecture

You will find 2 separate servers in this repo:
- `cms/` - A CMS server that lets you edit a post and configure webhooks to call on each update
- `www/` - A www server with a `/build-hook` URL to triggers a build

## Get started

1. Install [Deno](https://deno.land/manual@v1.36.2/getting_started/installation) on your machine.
2. Seed the CMS' SQLite database by running `deno task cms:seed`.
3. Start the `www` and `cms` servers by running `deno task dev`.
5. Visit the CMS at http://localhost:3000. This will have a sample title and body displayed from our SQLite database.

### Test your webhook

1. Visit the example site at http://localhost:5000. You should see a placeholder message noting the site isn't built yet. Let's change that!
2. Head back to the CMS server at http://localhost/3000, and configure a webhook by submitting http://localhost:5000/build-hook under the Webhooks form.
3. Edit the post contents and hit "Update." Heading back to http://localhost:5000, you should see your built site 🥳 There should also be a generated `www/built.html` file in your project directory.

## Deploy the Railway

This repo is configured to deploy to [Railway](https://railway.app).

1. Publish your clone of this repository to a personal GitHub account. This is because Railway relies on GitHub repositories for live redeployments.
2. Create a new Railway account with your GitHub credentials
3. Create a new project from your new GitHub repository.
4. Under "Settings," update the `build` and `start` commands for the server you would like to deploy. This example configured the CMS service for deployment:

<img width="925" alt="image" src="https://github.com/bholmesdev/prismic-webhooks/assets/51384119/be3af5f3-ee6d-4842-befd-d794a3afe0a0">

5. Under "Settings > Environment," create a custom domain with the Add button. This should expose your CMS service on a public URL:

<img width="641" alt="image" src="https://github.com/bholmesdev/prismic-webhooks/assets/51384119/f3c91a68-bd39-4fe7-b2bc-23fb7a4d79b6">

6. To deploy the `www` application, you'll need to create a _second_ new project using the same GitHub repository, and replace the above deploy command with `deno task www:serve`.
7. With each of these deployed, you can follow the "Test your webhook" instructions above using the public Railway domain as your webhook.
