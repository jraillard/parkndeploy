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

// Build the dependency injection container and create the application
var app = builder.Build();

// In case of development environment, add Swagger middleware and UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add HTTPS redirection
app.UseHttpsRedirection();

// Add the endpoint to get Angers parkings using minimal API
app.MapGet("/parkings-angers", async (OpenDataAngersService openDataAngersService) =>
{
    var parkings = await openDataAngersService.GetParkingsAsync();

    return parkings;
})
.WithName("GetAngersParkings")
.WithOpenApi();

// Run the WebApplication
app.Run();
