`WIP`

> Notes : 

two way of doing it : 
- easy one => https://www.aaron-powell.com/posts/2022-06-29-deploy-swa-with-bicep/ : basically you create the resource on azure with some properties and azure provides you the yaml file containing ci-cd code to deploy your app on this SWA
it also allow you, by default to get a temporary environment that is created and testable in a pull-request https://learn.microsoft.com/en-us/azure/static-web-apps/preview-environments

- "harder one" but more customisable and more adapted for most real-world use-cases : deploy bicep resource and then the app on it as we did with backend https://github.com/aaronpowell/aaronpowell.github.io/tree/main/.github/workflows/  => this get inspiration on the pipeline azure is giving you by default


bicep
create swaLocation param => swa are restricted to some locations (create GH secrets and pass it)


https://medium.com/codex/publish-azure-static-web-apps-using-a-bicep-template-ca315a825b74

for god sake 
https://github.com/Azure/static-web-apps/issues/868
https://github.com/sinedied/azure-checkin/blob/main/scripts/deployment/create-infra.sh

deploying swa with bicep One or more properties, including the resource name, are missing. Please add them and retry.
dont make the error that cost me 2h of debugging ... properties object, even empty, is mandatory !

![wouhou swa page](swa_default_page.png)
