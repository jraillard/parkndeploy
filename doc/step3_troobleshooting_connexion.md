# Step 3 : Troobleshooting Frontend <==> API connexion

## Find out the problem

Let's open your navigator debugger, go on the **Network tab** and reload so that we could see the request made on the API.

You see ? The Frontend is calling the Backend but using the Frontend URL, weird huh ?

It seems our call is being redirected by a proxy or something similar. :eyes:

Let's take a step back.

What would happend if we deployed our app in a basic provider like OVH for instance ?

You wouldn't have such a proxy (by default), and would have seen the API URL in the chrome debugger Network tab.

You would then have to fix CORS error by adding a policy on your backend (whether on the App Service or inside the Backend App directly), et voilà !

But that's not how Azure Static App works. :grimacing:

We'll have to use a what we call a `Linked Backend`.

Of course Static Web App could be linked to multiple backend with differents [types](https://learn.microsoft.com/azure/static-web-apps/apis-overview#api-options) (depending on sku used).

In order to link our Azure App Service instance, we'll need the **Standard** sku (which is not free :smirk:).

> **Notes** : Some [constraints](https://learn.microsoft.com/azure/static-web-apps/apis-overview#constraints) have to be keep in mind, especially having a `/api` basePath on your API, that's why it's mentionned in the [backend readme file](../backend/README.md).

## Frontend Infrastructure update

Let's start by updating the Static Web App sku :

```bicep
sku: {   
    name: 'Standard'
    tier: 'Standard'
}
```

Then create a new bicep module `./infrastructure/modules/staticWebAppBackend.bicep` : 

```bicep
param backendBindedResourceId string
param swaName string
param location string

resource staticWebAppBackend 'Microsoft.Web/staticSites/linkedBackends@2022-03-01' = {
  name: '${swaName}/backend'
  properties: {
    backendResourceId: backendBindedResourceId
    region: location
  }
}
```

Notice that we need to pass our backend resource id in order to create our link. :eyes:

So well, let's update our `./infrastructure/modules/appService.bicep` file to expose it :

```bicep
// Previous outputs 
// ...
output appServiceId string = app.id
```

And finally let's update our main bicep to create our new resource and pass the backend resource id :grin: :

```bicep
// Previous resources
// ...
module staticWebAppBackend 'modules/staticWebAppBackend.bicep' = {
  name: 'staticWebAppBackend'
  params: {
    backendBindedResourceId: appService.outputs.appServiceId
    swaName: staticWebApp.outputs.swaName
    location: location
  }
}

// Outputs 
// ...
```

Perfect our bicep project now meets our goal. :heavy_check_mark:

Push your code, trigger the workflow for the last time, and see the final result. :wink:

## Final test

If you followed every single steps, you should end with something like this : 

![final app](./assets/final_deployed_app.png)

Congratulation you just ended this workshop ! :sparkles:

You'll now have three options :
- Continue with [exercises](step4_further_improvements.md) to make some improvements on our project :eyes:
- Studying by your own following some [additionnal resources](to_go_further.md) :rocket:
- Leave it there, you heard enough about DevOps for now :dizzy_face:

Whatever, I hope you enjoyed this initiation DevOps workshop as much as me to produce it. :metal:

Feel free to leave me a comment on my [email adress](mailto:ju.raillard@hotmail.fr) or on my [LinkedIn](https://www.linkedin.com/in/julien-raillard/). :blush:

You can also leave a star on the main project you forked to make it more visible. :pray:

Thank you for following along, and happy coding! :computer:
