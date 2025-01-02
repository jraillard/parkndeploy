# Step 4 : Further improvements

Below you'll find some improvements suggestions to our project.

Those will be splited in two types : functionnalities, refactorings.

As its name implies, it would be better to implement functionnalities before thinking about refactorings but the choice is yours. :wink:

Stars number will indicate the difficulty.

Every suggested improvements will be followed with clue to achieve it (if needed).

## New functionnalities

:star: Trigger the pipeline using GitHub tag 

&rarr; In Git, a tag is a way to mark our source code and associate a version on it.

:star::star: Create a CI Pipeline specific for Merge Requests

&rarr; The pipeline should **only** be triggered when a merge request is created 

&rarr; The pipeline would (in parallel or sequentially) : 
- For Frontend app :
  - build the react app  
- For Backend app :
  - build / publish the dotnet app

&rarr; This aim to have a minimal check when someone in making a merge request on your repository before reviewing the code and merge it :wink:

:star::star: Create the CI Pipeline for releases and connect it to our CD Pipeline

&rarr; The CD pipeline would (in parallel or sequentially) : 
- For Frontend app :
  - build the react app
  - create and push the artifact
- For Backend app :
  - build / publish the dotnet app
  - create and push the artifact

&rarr; The CD pipeline should be automatically triggered when your CI pipeline is ended

:star::star::star: Display the app version in the Frontend app

&rarr; You need to be able to trigger your pipeline by a tag, in order to get the version

&rarr; You not necessarily need to have a CI pipeline but you can

&rarr; You need to pass, somehow, the version to the App in order to display it ... :eyes:

## Refactorings

:star: Use job template instead of having job code inside your workflow file

&rarr; Job template would allows you to use it in different ways. For instance use the `deploy_frontend` in a `qa` environment for testing also

&rarr; Place your templates in `./github/workflows/templates` folder 

:bulb: In a real-world you would have those templates in a common repository for your company but here a separate folder would be enough :blush:

:star::star: Split your CI and CD pipeline into two workflows

&rarr; A tag should trigger CI workflow and this workflow should trigger CD workflow if it pass

:star::star::star: Allow developer team to trigger the CD pipeline manually by specifying artifacts

&rarr; You'll need to allow manual workflow trigger and retrieve the artifacts url using the GitHub API
