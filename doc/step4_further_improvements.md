# Step 4 : Further improvements

Below you'll find some suggestions to improve our project.

Those will be splited in two types : functionnalities, refactorings.

As its name implies, it would be better to implement functionnalities before thinking about refactorings but the choice is yours. :wink:

Stars number will indicate the difficulty.

Every suggested improvements will be followed with clue(s) to achieve it.

## New functionnalities

:star: Trigger the deployment pipeline using git tag 

&rarr; In Git, a tag is a way to mark our source code and associate a version on it.

:bulb: You can restrict the tag to follow the semantic versionning : `MAJOR.MINOR.PATCH` , where MAJOR, MINOR and PATCH are a digit from 0 to 9.

:star::star: Create a CI Pipeline specific for Merge Requests

&rarr; The pipeline should **only** be triggered when a merge request is created 

&rarr; The pipeline would (in parallel or sequentially) : 
- For Frontend app :
  - build the react app  
  - run the linting script 
  
  :bulb: See package.json file ... :eyes:

- For Backend app :
  - [build the dotnet app in release mode](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build)

&rarr; This aim to have a minimal check (the solution compiles) when someone is making a merge request on your repository before reviewing the code and merge it :wink:

:star::star: Create the CI Pipeline for releases and connect it to our CD Pipeline

&rarr; At this step, CI release pipeline could just be single or multiple jobs (for both frontend & backend) executed before CD pipeline Jobs. Spliting into two distinct workflows is further refactoring step.

&rarr; The CI release pipeline would (in parallel or sequentially) : 
- For Frontend app :
  - build the react app
  - create and push the artifact
- For Backend app :
  - publish the dotnet app
  - create and push the artifact

&rarr; The CD pipeline should be automatically triggered when your CI pipeline is ended

&rarr; The CD pipeline should download the previous uploaded artifacts instead of building it

:star::star::star: Display the app version in the Frontend app

&rarr; You need to be able to trigger your pipeline by a tag, in order to get the version

&rarr; You not necessarily need to have a CI release pipeline implemented but you can

&rarr; You need to pass, somehow, the version to the App in order to display it, the [frontend README file](../frontend/README.md) might give your somes clues ... :eyes:

:star::star::star::star: Your package version displayed should be consistent in your repository.

&rarr; Means we can see the version in source code somehow 

## Refactorings

:star: Match the least privilege principle 

&rarr; Refactor the permissions to be retrieve only when needed (not on workflow level here ... :eyes:)

:star::star: Split your CI and CD pipeline into two workflows

&rarr; A tag should trigger CI workflow and this workflow should trigger CD workflow if it pass

:bulb: Test the two possibilities and analyze pros and cons :
- workflow_run
- workflow_call

When you're done, compare your finds with this [article](https://jiminbyun.medium.com/github-actions-workflow-run-vs-workflow-call-3f1a5c6e19d4). :eyes:

:star::star::star: Allow developer team to trigger the CD pipeline manually by specifying whether an artifact or a previous CI run_id.

&rarr; Remember that workflow_dispatch will only works if youre workflows are on default branch or if you're using GitHub CLI to trigger it.

## Next Level

:star::star::star::star::star: Allow developper team to deploy whether on :
- production environment (actual behavior)
- dev environment

If all workflow is trigger by a tag &rarr; it should match the following pattern : X.Y.Z-rc-XXXX (where X, Y, Z are all single digit)

&rarr; Solution should keep all previous features

&rarr; Don't forget secrets and azure things ... :eyes:

