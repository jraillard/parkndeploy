First : let's open chrome debugger, on network page and reload

you see ? the frontend is calling the backend on the same url ...

but you're url isnt there at all 

we'll need, somehow, to get the backend url and give it to the frontend app.

How do we usually add some variables as entry to a frontend app (ie a react one here) ? We use env files 
you remember ? we created one at the begining of this course :) we'll have to do the same but ... in Azure Static Web App instance 

How ? Basically as many articles can [mention it](https://medium.com/@jamescori/azure-static-site-deployment-with-environment-variables-8882c33bd426) ; you'll need to pass your env variables 
to your azure/static-web-apps-deploy@v1 github action 

and where do get the value ? as usual as output from your bicep deployment :)

```yml
- name: Deploy frontend to Static Web App
# ...
    env: 
        VITE_API_URL: ${{ needs.deploy_infrastructure.outputs.appServiceUrl }}
```

wait ... it's still doesnt work but github logs show that env have been well given ...

that's because we're using vite to build our package (see build command in package.json), and build uses build time env variable not runtime env variable
therefore you need to pass those during build command, not during deploy on swa


Personnal Notes > static web app by default add env files behind swa host this is done by a proxy
need to : 
update vite config & axios to by default call /api and redirect to local backend (which needs to defind a /api base path (avoid url rewrite))

no more ==> 
-> env file not needed anymore : 
- in vite config specify a proxy that redirect /api into localhost
- in azure you could : whether to use 
  - the paid solution which is adding a link between swa and app service => you only have to add it in swa config (need standard version)
     ==> you'll need to have a basePath set as "/api" on your api cause the swa is creating a proxy rule where : myswa.com/api/my-resources redirect to myapp/api/myresources.com
     ==> can find the way here https://learn.microsoft.com/en-us/azure/static-web-apps/apis-app-service
  - the free solution where : 
    - add a staticwebapp.config.json file with routing redirection written manually (ie integrate the app service url) https://learn.microsoft.com/en-us/azure/static-web-apps/configuration
    - configure cors on your app service manually
  - this dont exist ...
  
  
