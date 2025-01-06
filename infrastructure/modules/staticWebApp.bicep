param location string
param project string
param identifier string

resource swa 'Microsoft.Web/staticSites@2022-09-01' = {
  name: '${project}-swa-${identifier}'
  location: location
  
  sku: {
    name: 'Free'
  }  

  properties: {} // Even empty, it's mandatory ...
}

output swaName string = swa.name // Expose Static Web App name as we did for App Service for deployment purpose
