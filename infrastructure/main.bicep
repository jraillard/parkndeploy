targetScope = 'resourceGroup' // We'll deploy the resources in the provided resource group

param location string
param project string

// Here we'll use add an identifier to create a unique name for the App Service Plan, for example your trigram, so that everyone could deploy his own parkndeploy instance
param identifier string
param swaLocation string


// Create the AppServicePlan (AppService Wrapper in Azure)
module appServicePlan 'modules/appServicePlan.bicep' = {
  name: 'appServicePlan'
  params: {
    location: location
    project: project
    identifier: identifier
  }
}

// Create the AppService (responsible to host our ParkNDeploy API)
module appService 'modules/appService.bicep' = {
  name: 'appService'
  params: {
    location: location
    project: project
    identifier: identifier
    planId: appServicePlan.outputs.planId
  }
}

// Create the Static Web App (responsible to host our ParkNDeploy Frontend)
module staticWebApp 'modules/staticWebApp.bicep' = {
  name: 'staticWebApp'
  params: {
    location: swaLocation
    project: project
    identifier: identifier
  }
}


output appServiceName string = appService.outputs.appServiceName // Export AppServiceName in order to deploy the API later on
output staticWebAppName string = staticWebApp.outputs.swaName // Export StaticWebAppName in order to deploy the Frontend later on
