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
update vite config & axios to by default call /api and redirect to local backend
for swa we need to make a 