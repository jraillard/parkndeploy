# Application Insights Integration

## What is Application Insights?

**Application Insights** is an Azure monitoring service that provides real-time insights into your application's performance, availability, and usage. It automatically collects:
- **Requests**: HTTP requests to your API
- **Dependencies**: Calls to databases, external APIs, etc.
- **Exceptions**: Errors and failures
- **Custom events**: Any telemetry you explicitly track
- **Performance metrics**: Response times, failure rates, etc.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Your Application                      │
│                    (ParkNDeploy API)                     │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Application Insights SDK                        │  │
│  │  - Automatically tracks HTTP requests            │  │
│  │  - Captures exceptions                           │  │
│  │  - Monitors dependencies                         │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────┬──────────────────────────────────┘
                        │ Sends telemetry
                        ↓
┌─────────────────────────────────────────────────────────┐
│         Application Insights Resource (Azure)           │
│  - Stores telemetry data                                │
│  - Provides query interface                             │
│  - Retention: 30 days (configurable)                    │
└─────────────────────────────────────────────────────────┘
                        │
                        ↓
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
  ┌──────────┐                  ┌──────────────┐
  │  Logs    │                  │  Live Metrics │
  │  (KQL)   │                  │  Dashboard    │
  └──────────┘                  └──────────────┘
```

## What Was Deployed?

### 1. Infrastructure Changes

**New Bicep Module**: [infrastructure/modules/appInsights.bicep](../infrastructure/modules/appInsights.bicep)
- Creates an Application Insights resource in Azure
- Configured with 30-day retention (free tier compatible)
- Outputs: connection string, instrumentation key, resource name

**Updated App Service**: [infrastructure/modules/appService.bicep](../infrastructure/modules/appService.bicep)
- Added Application Insights connection string as environment variable
- Enabled Application Insights agent extension
- Automatically configured for telemetry collection

### 2. Code Changes

**Backend API**: [backend/ParkNDeploy.Api/Program.cs](../backend/ParkNDeploy.Api/Program.cs)
```csharp
// Added Application Insights telemetry collection
builder.Services.AddApplicationInsightsTelemetry();
```

**NuGet Package**: Added `Microsoft.ApplicationInsights.AspNetCore` v2.22.0

## How It Works

### Automatic Telemetry Collection

Once deployed, Application Insights automatically tracks:

1. **HTTP Requests**
   - Endpoint called
   - Response time
   - Status code
   - Client IP
   
2. **Dependencies**
   - External API calls (e.g., OpenData Angers API)
   - HTTP client calls
   - Duration and success/failure

3. **Exceptions**
   - Stack traces
   - Error messages
   - Request context

4. **Performance Counters**
   - CPU usage
   - Memory consumption
   - Request rate

## Accessing Application Insights

### Method 1: Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for "Application Insights"
3. Select your resource: `parkndeploy-appi-{your-identifier}`
4. Explore:
   - **Overview**: Quick metrics dashboard
   - **Live Metrics**: Real-time monitoring
   - **Transaction Search**: Individual request details
   - **Failures**: Error analysis
   - **Performance**: Response time analysis
   - **Logs**: KQL query interface

### Method 2: Logs (Kusto Query Language)

Go to **Logs** section in Application Insights to run queries.

## Common KQL Queries for Debugging

### 1. View All Recent Requests

```kql
requests
| where timestamp > ago(1h)
| project timestamp, name, url, resultCode, duration
| order by timestamp desc
| take 50
```

**What it shows**: Last 50 HTTP requests in the past hour

### 2. Find Failed Requests

```kql
requests
| where timestamp > ago(24h)
| where success == false
| project timestamp, name, url, resultCode, duration, customDimensions
| order by timestamp desc
```

**What it shows**: All failed requests (4xx, 5xx errors) in the last 24 hours

### 3. Find Slow Requests

```kql
requests
| where timestamp > ago(1h)
| where duration > 1000 // Duration in milliseconds
| project timestamp, name, url, duration, resultCode
| order by duration desc
```

**What it shows**: Requests that took more than 1 second

### 4. View Exceptions

```kql
exceptions
| where timestamp > ago(24h)
| project timestamp, type, outerMessage, innermostMessage, problemId
| order by timestamp desc
```

**What it shows**: All exceptions thrown in your application

### 5. Analyze External API Calls

```kql
dependencies
| where timestamp > ago(1h)
| where type == "Http"
| project timestamp, name, target, duration, success, resultCode
| order by timestamp desc
```

**What it shows**: Calls to external APIs (like OpenData Angers)

### 6. Request Count by Endpoint

```kql
requests
| where timestamp > ago(24h)
| summarize count() by name
| order by count_ desc
```

**What it shows**: Most frequently called endpoints

### 7. Average Response Time by Endpoint

```kql
requests
| where timestamp > ago(24h)
| summarize avg(duration) by name
| order by avg_duration desc
```

**What it shows**: Which endpoints are slowest on average

### 8. Error Rate Over Time

```kql
requests
| where timestamp > ago(24h)
| summarize 
    total = count(),
    failed = countif(success == false)
    by bin(timestamp, 1h)
| extend errorRate = (failed * 100.0 / total)
| project timestamp, errorRate, total, failed
| order by timestamp desc
```

**What it shows**: Error rate percentage per hour

### 9. Find Requests with Specific Query Parameters

```kql
requests
| where timestamp > ago(1h)
| where url contains "parkingName="
| project timestamp, url, duration, resultCode
| order by timestamp desc
```

**What it shows**: Track how users are filtering parkings

### 10. Full Request Details (for debugging specific issue)

```kql
requests
| where timestamp > ago(1h)
| where name == "GET /parkings-angers"
| extend parkingNameParam = tostring(customDimensions.parkingName)
| project 
    timestamp,
    url,
    resultCode,
    duration,
    parkingNameParam,
    clientIp = client_IP,
    browser = client_Browser
| order by timestamp desc
```

## Debugging Scenarios

### Scenario 1: API Returns 500 Error

**Goal**: Find what's causing the error

```kql
// 1. Find the failed request
requests
| where timestamp > ago(1h)
| where resultCode >= 500
| project timestamp, name, url, resultCode, operation_Id

// 2. Get the exception details
exceptions
| where timestamp > ago(1h)
| project timestamp, type, outerMessage, details
```

### Scenario 2: Slow Performance

**Goal**: Identify bottlenecks

```kql
// 1. Find slow requests
requests
| where timestamp > ago(1h)
| where duration > 2000
| project timestamp, name, url, duration, operation_Id

// 2. Check which dependencies are slow
dependencies
| where timestamp > ago(1h)
| join kind=inner (
    requests
    | where duration > 2000
) on operation_Id
| project timestamp, dependencyName = name, dependencyDuration = duration, requestUrl = url1
```

### Scenario 3: External API Issues

**Goal**: Check if OpenData Angers API is failing

```kql
dependencies
| where timestamp > ago(1h)
| where target contains "data.angers.fr"
| where success == false
| project timestamp, name, target, resultCode, duration
| order by timestamp desc
```

### Scenario 4: Usage Analysis

**Goal**: Understand how users interact with the API

```kql
// 1. Which parkings are users searching for most?
requests
| where timestamp > ago(24h)
| where name == "GET /parkings-angers"
| where url contains "parkingName="
| extend parkingSearch = extract("parkingName=([^&]*)", 1, url)
| summarize searchCount = count() by parkingSearch
| order by searchCount desc
| take 10

// 2. Peak usage hours
requests
| where timestamp > ago(7d)
| summarize requestCount = count() by bin(timestamp, 1h)
| render timechart
```

## Tips for Students

### 1. Understanding Telemetry Correlation

Application Insights uses `operation_Id` to correlate:
- The initial request
- All dependencies called during that request
- Any exceptions thrown

Use `operation_Id` in joins to trace a complete request flow.

### 2. Custom Telemetry (Advanced)

You can add custom tracking in your code:

```csharp
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;

public class OpenDataAngersService
{
    private readonly HttpClient _client;
    private readonly TelemetryClient _telemetry;

    public OpenDataAngersService(HttpClient client, TelemetryClient telemetry)
    {
        _client = client;
        _telemetry = telemetry;
    }

    public async Task<Parking[]> GetParkingsAsync(string? parkingName)
    {
        // Track custom event
        _telemetry.TrackEvent("ParkingSearch", 
            new Dictionary<string, string> { 
                { "searchTerm", parkingName ?? "all" } 
            });

        // Your existing code...
    }
}
```

### 3. Setting Up Alerts

You can create alerts in Azure to notify you when:
- Error rate exceeds threshold
- Response time is too high
- Application is down

Go to: Application Insights → Alerts → New alert rule

### 4. Cost Management

- **Free tier**: 1 GB data ingestion per month
- After that: ~$2.30 per GB
- Set retention to 30 days to control costs
- Use sampling for high-traffic apps

### 5. Best Practices

✅ **DO**:
- Check logs regularly to understand application behavior
- Create saved queries for common investigations
- Use dashboards to visualize key metrics
- Set up alerts for critical issues

❌ **DON'T**:
- Log sensitive data (passwords, tokens, PII)
- Query without time filters (use `ago()` function)
- Ignore warnings about high data ingestion

## Exercises for Students

### Exercise 1: Find Your First Request

1. Deploy the updated application
2. Make a request to your API (visit the Swagger UI)
3. Go to Application Insights → Logs
4. Run the query to find your request
5. Identify: timestamp, status code, duration

### Exercise 2: Simulate an Error

1. Temporarily break something in the code (e.g., wrong API URL)
2. Deploy and make a request
3. Use KQL to find the exception
4. Analyze the stack trace and fix the issue

### Exercise 3: Performance Analysis

1. Make multiple requests to the `/parkings-angers` endpoint
2. Use KQL to find:
   - Average response time
   - Slowest request
   - How long external API calls take
3. Identify potential optimizations

### Exercise 4: Create a Dashboard

1. Create queries for:
   - Total requests in last 24h
   - Error rate
   - Average response time
   - Top 5 most called endpoints
2. Pin these queries to an Azure Dashboard
3. Share the dashboard URL with your team

## Additional Resources

- [Application Insights Overview](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview)
- [KQL Quick Reference](https://learn.microsoft.com/azure/data-explorer/kql-quick-reference)
- [.NET Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/asp-net-core)
- [Query Examples](https://learn.microsoft.com/azure/azure-monitor/logs/examples)

## Next Steps

Now that you have Application Insights set up:

1. **Deploy the changes** (push your code and run the pipeline)
2. **Make some requests** to generate telemetry
3. **Explore the logs** using the queries above
4. **Set up your first alert** for high error rates
5. **Practice debugging** using the scenarios above

Happy monitoring! 📊
