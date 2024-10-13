# Description
`ParkNDeploy` is an introductory DevOps course designed to guide you through deploying a basic Parking Finder App on Azure.

This course covers continuous integration and continuous deployment (CI/CD) pipelines, as well as infrastructure-as-code (IaC) practices.

## Prerequisites

### Tools

- An Azure Account in order to deploy your App :rocket: 
  - [Azure Students](./doc/azure_students.md)
  - [Classic one](https://azure.microsoft.com/pricing/purchase-options/azure-account?icid=azurefreeaccount) (you will be ask to put a credit card even if nothing is debited)

- A GitHub account in order to fork this repo and start to work :wink:

- IDEs to build the app locally : 
  - Visual Studio Community with .Net 8 SDK (Backend)
  - Visual Studio Code & Node JS >= 21.7.1 (Frontend)

- A source code management tool :
  - Git Bash for CLI guys :sunglasses:
  - [Fork](https://git-fork.com/) for GUI guys :star:

### Knowledges

- **[Appreciated]** Basic repository management (commits, push, merge-request)
- **[Optional]** Basic understanding of APIs
- **[Optional]** Basic understanding of SPAs

## Build the App locally

### Getting the project

First of all, you'll need to get the source code :grin: : 
- Fork this project on your personnal GitHub account 

:warning: Don't select `Copy the DEFAULT branch only` option, as you will need all the branches in the repository.
> If you never made a fork, just follow the steps mentionned [here](https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) :eyes:.

- Clone the project on your local machine

> Again, if you never did it, just follow the steps mentionned [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository) :eyes:.

- And that's it ! :sparkles: 

:bulb: The repository will contain branches : 
- `main` : this will be you're starting point
- `solution` : on this branch you'll will be able to see answers, step by step, to compare with your code if you need to
- and also... `your_branches` : you have the choice of commiting / pushing everything on main branch or use specific branches (we call that [feature branches](https://learn.microsoft.com/azure/devops/repos/git/git-branching-guidance?view=azure-devops#use-feature-branches-for-your-work)) for each steps :smirk: 

### Backend
---
Easiest one :
- Open the `ParkNDeploy.sln` file with Visual Studio 
- Hit the `Run` button using the `Project Https` profile (default one)
- Wait the Swagger API to launch on your default navigator
- You can start to play with it to see what it does :video_game:

> Some details about how the API is made and what it does could be find in the [backend README file](./backend/README.md).

### Frontend
---

Follow the next steps : 

:one: Open the `./frontend` folder with Visual Studio Code

:two: Create a `.env` file in `./frontend` folder with the following content 

```yaml
# This will allow the frontend app to contact our API
# your_api_url_with_port should be, for instance, https://localhost:7085
VITE_API_URL="your_api_url_with_port"
```

:three: Open a command line terminal using `CTRL+ù` hotkey or through the `Terminal menu` on the top of Visual Studio Code

:four: Run the following commands : 

```bash
# This will download all the dependencies for the frontend
npm install

# This will compiles and run the frontend app under a Vite developpement server
npm run dev

# If it works, you should see a localhost URL link
```

:five: Show the app in browser, here you have two possibilities : 

- Without Visual Studio Code debugger : just `CTRL+Click` on the localhost URL that is being displayed on the terminal you just launched before

- With Visual Studio Code debugger : 
  - Hit `CTRL+SHIFT+D` hotkey or clic on ![debug icon](./doc/assets/vscode_debug_icon.png) in the left navigation bar
  
  - Clic on ![play button](./doc/assets/vscode_debug_play_button.png) 

  &rarr; Basically VS Code will run the [launch.json config](./frontend/.vscode/launch.json) which launch a Chrome navigator and attach the VS Code debugger to the frontend app process. This will allow you to debug through breakpoints and so on inside Visual Studio code (instead of spamming your source code with `console.log()` :stuck_out_tongue_winking_eye:).

> Some details about how the Frontend App is made and what it does could be find in the [frontend README file](./frontend/README.md)

## Getting Started with ParkNDeploy

### ***How would you define DevOps ?***

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

### Let's dive-In !

:rocket: Buckle up, folks! It's time to blast off to the [first step](./doc/step1_deploy_backend.md) of our course. Ready, set, deploy!