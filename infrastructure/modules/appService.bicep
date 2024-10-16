param location string
param project string

// Here we'll use the environment to create a unique name for the App Service Plan, for example your trigram
// In real world scenarios that would really be associated with the environment, like dev, test, prod
param environment string

// Here you should pass the planId from the appServicePlan module
param planId string

resource app 'Microsoft.Web/sites@2022-03-01' = {
  name: '${project}-app-${environment}'
  location: location

  properties: {
    serverFarmId: planId
    reserved: true

    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|8.0' // Specify to setup the .NET Core 8.0 runtime on the linux under the hood
    }
  }
}

output appServiceName string = app.name // We'll need the name of the App Service later on
