using Microsoft.OpenApi.Models;
using ParkNDeploy.Api.Endpoints;
using ParkNDeploy.Api.Services;

// Create the dependecy injection container
var builder = WebApplication.CreateBuilder(args);

// Add Application Insights telemetry
builder.Services.AddApplicationInsightsTelemetry();

// Add OpenAPI document & Swagger capabilities
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add service allowing to call OpenDataAngers API using a typed http client 
builder.Services.AddHttpClient<OpenDataAngersService>((serviceProvider, client) =>
{
    client.BaseAddress = new Uri("https://data.angers.fr");
});

// Build the dependency injection container and create the application
var app = builder.Build();

const string BASE_PATH = "/api";

// Add Swagger middleware using base path
app.UseSwagger(c =>
{
    c.RouteTemplate = "swagger/{documentName}/swagger.json";
    c.PreSerializeFilters.Add((swaggerDoc, httpReq) =>
    {
        swaggerDoc.Servers = new List<OpenApiServer> { new() { Url = $"{httpReq.Scheme}://{httpReq.Host.Value}{BASE_PATH}" } };
    });
});

// Add Swagger UI middleware
app.UseSwaggerUI();

// Add HTTPS redirection
app.UseHttpsRedirection();

// Define the base path for the API
// All requests to BASE_PATH will be handled by the API as it was on default path
app.UsePathBase(BASE_PATH);

// Add the endpoint to get Angers parkings using minimal API
app.MapParkingsAngersEndpoints();

// Run the WebApplication
app.Run();
