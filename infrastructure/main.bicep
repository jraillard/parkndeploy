targetScope = 'resourceGroup' // We'll deploy the resources in the provided resource group

param location string
param project string

// Here we'll use add an identifier to create a unique name for the App Service Plan, for example your trigram, so that everyone could deploy his own parkndeploy instance
param identifier string
param swaLocation string

// Create Application Insights for monitoring
module appInsights 'modules/appInsights.bicep' = {
  name: 'appInsights'
  params: {
    location: location
    project: project
    identifier: identifier
  }
}

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
    appInsightsConnectionString: appInsights.outputs.appInsightsConnectionString
    appInsightsInstrumentationKey: appInsights.outputs.appInsightsInstrumentationKey
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

module staticWebAppBackend 'modules/staticWebAppBackend.bicep' = {
  name: 'staticWebAppBackend'
  params: {
    backendBindedResourceId: appService.outputs.appServiceId
    swaName: staticWebApp.outputs.swaName
    location: location
  }
}


output appServiceName string = appService.outputs.appServiceName // Export AppServiceName in order to deploy the API later on
output appServiceUrl string = appService.outputs.appServiceUrl // Export AppServiceUrl in order to deploy the Frontend later on
output staticWebAppName string = staticWebApp.outputs.swaName // Export StaticWebAppName in order to deploy the Frontend later on
output appInsightsName string = appInsights.outputs.appInsightsName // Export App Insights name for monitoring
