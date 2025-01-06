targetScope = 'resourceGroup' // We'll deploy the resources in the provided resource group

// Parameters to easily construct resource names
param location string
param project string

param swaLocation string // Static Web App locations are limited, we need to add another variable

// Here we'll add an identifier to create a unique name for the App Service Plan, for example your trigram, so that everyone could deploy his own parkndeploy instance
param identifier string

// Create the AppServicePlan through the AppServicePlan module
module appServicePlan 'modules/appServicePlan.bicep' = {
  name: 'appServicePlan'
  params: {
    location: location
    project: project
    identifier: identifier
  }
}

// Create the AppService through the AppService module
module appService 'modules/appService.bicep' = {
  name: 'appService'
  params: {
    location: location
    project: project
    identifier: identifier
    planId: appServicePlan.outputs.planId // Use the appServicePlan output to get its id back => an App Service needs to reference its App Service Plan
  }
}

// Create the Static Web App through the StaticWebApp module
module staticWebApp 'modules/staticWebApp.bicep' = {
    name: 'staticWebApp'
    params: {
      location: swaLocation
      project: project
      identifier: identifier
    }
  }

// Export App Service Name
output appServiceName string = appService.outputs.appServiceName
output staticWebAppName string = staticWebApp.outputs.swaName // Export StaticWebAppName in order to deploy the Frontend late
