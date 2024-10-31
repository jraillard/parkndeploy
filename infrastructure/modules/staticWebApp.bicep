param location string
param project string

// Here we'll use add an identifier to create a unique name for the App Service Plan, for example your trigram, so that everyone could deploy his own parkndeploy instance
param identifier string

resource swa 'Microsoft.Web/staticSites@2022-09-01' = {
  name: '${project}-swa-${identifier}'
  location: location
  
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }  

  properties: {} // even empty, it's mandatory ...
}

output swaName string = swa.name
