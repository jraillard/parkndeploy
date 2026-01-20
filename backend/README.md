# ParkNDeploy Backend

`ParkNDeploy Backend` is a dotnet solution responsible to deliver the API capabilities.

It is containing only one project : `ParkNDeploy.API`, a [dotnet 9 minimal API](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-9.0).

## Features 

Only one endpoint is exposed through the `/parking-angers` endpoint.

It is fetching data from two OpenData Datasets exposed by the Angers (France) : 
- [parking-angers](https://data.angers.fr/explore/dataset/parking-angers/api/) : giving real-time parking place availability
- [angers-stationnement](https://data.angers.fr/explore/dataset/angers_stationnement/api/) : giving parkings details

The result expose, for each parkings : 
- Name
- Address
- AvailablePlaces
- Parking status (based on availability rate)

## Implementation

The code is made to be as simple as it could, the main objective of this course being the DevOps capabilities.

- a `/api` basePath is implemented in order to access to our API from the frontend
> &rarr; Adding a basePath is a good practice (it's by default on dotnet controllers but not on minimal apis) and will serve us when deploying the frontend on azure ... :smirk:

- Swagger API is always displayed to facilitate that the API would be well deployed
> In real-world, you might not want to expose it to every one for security purposes

- A minimal API endpoint exposed through the `MapParkingsAngersEndpoints()` extension method

- A `Typed HTTP Client` responsible to do :
  - our data fetching
  - and business logic
> Again in real-wold you might want to split those for Maintainability & Extensibility
> Details about what a Type HTTP Client is could be find [here](https://www.milanjovanovic.tech/blog/the-right-way-to-use-httpclient-in-dotnet).

## Run

As mentionned in [main README file](../README.md#backend) :

- Open the `ParkNDeploy.sln` file with Visual Studio 
- Hit the `Run` button using the `Project Https` profile (default one)
- Wait the Swagger API to launch on your default navigator

Test merge request...