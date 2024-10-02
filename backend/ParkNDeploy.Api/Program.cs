using ParkNDeploy.Api.Endpoints;
using ParkNDeploy.Api.Services;

// Create the dependecy injection container
var builder = WebApplication.CreateBuilder(args);

// Add OpenAPI document & Swagger capabilities
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add service allowing to call OpenDataAngers API using a typed http client 
builder.Services.AddHttpClient<OpenDataAngersService>((serviceProvider, client) =>
{
    client.BaseAddress = new Uri("https://data.angers.fr");
});


// In case of development environment Add CORS policy for our React App
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "LocalPolicy",
            policy =>
            {
                policy.WithOrigins("http://localhost:5175");
            });
    });
}

// Build the dependency injection container and create the application
var app = builder.Build();

// In case of development environment
if (app.Environment.IsDevelopment())
{
    // Add Swagger middleware
    app.UseSwagger();
    // Add Swagger UI middleware
    app.UseSwaggerUI();
    // Add CORS middleware
    app.UseCors("LocalPolicy");
}

// Add HTTPS redirection
app.UseHttpsRedirection();

// Add the endpoint to get Angers parkings using minimal API
app.MapParkingsAngersEndpoints();

// Run the WebApplication
app.Run();
