`WIP`

> Notes : 

Go on  https://learn.microsoft.com/en-us/azure/templates/  left search bar to find all up-to-date templates to use

ex : AppServicePlan = https://learn.microsoft.com/en-us/azure/templates/microsoft.web/2022-09-01/serverfarms?pivots=deployment-language-bicep

Connection GH & Azure https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-cli%2Clinux#use-the-azure-login-action-with-a-service-principal-secret
Learn the good way : Sign in with OpenID Connect using a Microsoft Entra application or a user-assigned managed identity (even if service principal + secret could be enough in this course)
https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect

As you'll be the only one to use you're subscription we'll use the second Option : User-assigned managed identity
The first one would be the options for a company (creating an application for managing multiple identities easier)

So follow the steps mentionned

For the resourcegroup specify : rg-uai-{trigram}

- rg for resource group
- uai for user assigned identity
- your trigram so that the rg name is unique

for the user assigned managed identity name just remove rg : uai-{trigram} (note : add parkndeploy ?)

note => AZURE_CLIENT_ID & AZURE_SUBSCRIPTION_ID could be find in your UAI ; AZURE_TENANT_ID could be find in Microsft Entra ID Service (look for it in the main azure search bar)