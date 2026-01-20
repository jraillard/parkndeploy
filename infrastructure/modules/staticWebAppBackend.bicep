param backendBindedResourceId string
param swaName string
param location string

resource staticWebAppBackend 'Microsoft.Web/staticSites/linkedBackends@2022-03-01' = {
  name: '${swaName}/backend'
  properties: {
    backendResourceId: backendBindedResourceId
    region: location
  }
}
