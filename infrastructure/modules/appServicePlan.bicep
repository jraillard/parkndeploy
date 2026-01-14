param location string
param project string
param identifier string

resource plan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${project}-plan-${identifier}'
  location: location
  
  sku: {
    name: 'F1' // We use F1 pricing plan (free one) as we don't need specific features
  }
  
  kind: 'app,linux' // Allow to deploy on an App Service using Linux OS
  
  properties: {
    reserved: true // Specifity of App Service with Linux OS
  }
}

output planId string = plan.id // Export the App Service identifier
