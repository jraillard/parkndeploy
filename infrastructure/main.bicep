targetScope = 'subscription' // We'll deploy the resources at the subscription level

param location string
param project string

// Here we'll use the environment to create a unique name for the App Service Plan, for example your trigram
// In real world scenarios that would really be associated with the environment, like dev, test, prod
param environment string

// Create the resource group where all the resources will be deployed
resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-${project}-${environment}'
  location: location
}

// Create the AppServicePlan (AppService Wrapper in Azure)
module appServicePlan 'modules/appServicePlan.bicep' = {
  name: 'appServicePlan'
  scope: rg
  params: {
    location: location
    project: project
    environment: environment
  }
}

// Create the AppService (responsible to host our ParkNDeploy API)
module appService 'modules/appService.bicep' = {
  name: 'appService'
  scope: rg
  params: {
    location: location
    project: project
    environment: environment
    planId: appServicePlan.outputs.planId
  }
}

output rgName string = rg.name
output appServiceName string = appService.outputs.appServiceName
