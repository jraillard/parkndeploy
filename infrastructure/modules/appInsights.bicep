param location string
param project string
param identifier string

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${project}-appi-${identifier}'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: 30 // Keep logs for 30 days (free tier compatible)
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

output appInsightsId string = appInsights.id
output appInsightsInstrumentationKey string = appInsights.properties.InstrumentationKey
output appInsightsConnectionString string = appInsights.properties.ConnectionString
output appInsightsName string = appInsights.name
