param location string
param project string

// Here we'll use the environment to create a unique name for the App Service Plan, for example your trigram
// In real world scenarios that would really be associated with the environment, like dev, test, prod
param environment string

resource plan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${project}-plan-${environment}'
  location: location
  
  sku: {
    name: 'F1' // We use F1 pricing plan (free one) as we don't need specific features
  }
  
  kind: 'app,linux'
  
  properties: {
    reserved: true
  }
}

output planId string = plan.id // The resource id of the plan will be needed for the App Service
