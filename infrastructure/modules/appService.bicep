param location string
param project string

// Here we'll use add an identifier to create a unique name for the App Service Plan, for example your trigram, so that everyone could deploy his own parkndeploy instance
param identifier string

// Here you should pass the planId from the appServicePlan module
param planId string

resource app 'Microsoft.Web/sites@2022-03-01' = {
  name: '${project}-app-${identifier}'
  location: location

  properties: {
    serverFarmId: planId
    reserved: true

    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|9.0' // Specify to setup the .NET Core 9.0 runtime on the linux under the hood
    }
  }
}

output appServiceName string = app.name // We'll need the name of the App Service later on
