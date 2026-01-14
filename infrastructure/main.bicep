targetScope = 'resourceGroup' // We'll deploy the resources in the provided resource group

// Parameters to easily construct resource names
param location string
param project string

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

// Export App Service Name
output appServiceName string = appService.outputs.appServiceName
