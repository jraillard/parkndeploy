# Preamble : Studying DevOps a bit

This part aim to describe some technical terms we'll use a lot and express what will be exactly the purpose of this workshop.

## ***How would you define DevOps ?***

&rarr; I kinda like the [Microsoft one](https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-devops) which says that it's the union from processes, and technologies from developpement (Dev) and operational (Ops) teams in order to accelerate the delivery of high-quality products to their customers.

That means that `DevOps` is bound to all the application lifecycle : 
- `PLAN` : Ideate, define features and track progress and bugs using agile development, kanban boards and KPI dashboard
- `DEVELOP` : Develop code in teams (write, test, review, integration), build artifacts (application packages), use automations (tests, formating, security checks)
- `DELIVER` : Deploy your application consistently and reliably, configure managed infrastructure, be able to deliver frequently
- `OPERATE` : Maintain, control and get feedback on your application through monitoring, alerting and troubleshooting on production environments

Embrace the `DevOps` is in vogue; it is a proven methodology :star:.

In this initiation course we will focus on :
- `DEVELOP` : Be able to package both frontend and backend into deployable artifacts
- `DELIVER` : Provision an Azure Infrastructure and deploy your artifacts in it to be always able to to find a parking in Angers :sparkles:


## Infrastructure as Code

Infrastructure as Code or  `IaC`, means that we will be allowed to create our Infrastructure, in Azure for instance, using code.

There's two ways of doing IaC :
- `imperative` : you'll have to describe each steps to end with the desired infrastructure (like an algorithm)
- `declarative` : you'll have to defines the desired state and the tool you're using will be responsible of executing needed steps

&rarr; Most of the time, you'll looking for declarative instead of imperative as it is more easy to read / maintain and evolve ; but sometimes you'll not be allowed to do such a thing.

Here's a non-exhaustive list of IaC tools :
- Ansible (imperative, declarative in some ways)
- Terraform (declarative)
- Bicep (declarative)

## Continuous Integration

Continuous Integration, or `CI`, is a process that allow developers to gather all their works into a single or multiple deployable artifacts.

You'll likely hear about "CI pipelines" as it could be schematized as a pipe starting with an event (Pull Request, git tag, deployment button, etc.), passing through integration steps : check for the application to still be buildable, automated tests (unit, integration, security), code formating and ending with one or more packages.

Packages can be of different shapes : zip files, images, docker images, vm images and are made so that they can be directly deployable without any modifications. In that way, CI pipelines are usually followed by `CD pipelines`.

Platform that are hosting your code usually offer a way of writing CI/CD pipelines :
- GitHub Actions &rarr; GitHub
- Azure Pipelines &rarr; Azure DevOps
- GitLab Pipelines &rarr; GitLab

But you can also find some other third-party tools such as : 
- Jenkins
- ArgoCD
- BitBucket Pipeline
- RunsOn
- Quirrel
- etc.

## Continuous Deployment

Continuous Deployment, or `CD`, is a process that allow to deploy an artifact to an environment (dev, test, stating, production, etc.).

CD pipelines could be directly triggered at the end of a CI pipeline or you could had some `guards` such as : manual validation, tests on artifact, wait for a schedule, you could think about *almost* anything (time will brake your imagination :stuck_out_tongue:).

CD pipelines are usually split into two main parts : 
- provisionning the environment infrastructure
- deploying our artifact

... but they can be chained ! :smirk:

You could think about the following process :

:one: Developers are pushing their code to the main branch with some nice new features

:two: An artifact is made by running a CI pipeline on this branch

:three: A first CD pipeline deploy this package to a QA environment so that UI & Functionnal tests are made

:four: Testers put their stamp so a second CD pipeline is triggered to a staging environment

:five: Team is agreeing that our new version is now ready and a last CD pipeline is triggered to push our package to production environment 

Et voilà ! :sparkles:

> CI/CD pipelines conception is hardly-bound to the team size, the application size and the time-to-deliver a feature : every project could have a unique one.

## What will we do with ParkNDeploy then ?

The next steps of this workshop will aim to : 
- make you write IaC scripts to host both Frontend and Backend App
- make you write CD pipelines to execute IaC scripts and deploy our apps
- trigger your pipelines each time you push to your remoted branches

We'll use : 
- Azure to host our infrastructure (in the cloud :cloud:)
- GitHub Actions as CI/CD pipeline tool
- Bicep as IaC tool (recommended one to provision Azure resources)

CI pipelines will voluntary not be covered as we want to focus on deploying : we don't need any artifact checking process or anything else as the ParkNDeploy is already written and ready to go.

Nevertheless, you'll be suggest to create CI pipeline at the end as bonus exercices to match with much real-world process :smirk:.

Still seems confusing ? Don't worry, and [let's deploy our backend API](./step1_deploy_backend.md) :sunglasses:.