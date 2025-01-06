param location string
param project string
param identifier string

// App Service Plan identifier that will host our App Service
param planId string

resource app 'Microsoft.Web/sites@2022-03-01' = {
  name: '${project}-app-${identifier}'
  location: location

  properties: {
    serverFarmId: planId
    reserved: true

    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|8.0' // Specify to setup the .NET Core 8.0 runtime (used by our backend API) on the Linux machine under the hood
    }
  }
}

output appServiceName string = app.name // Export the App Service name for deployment
