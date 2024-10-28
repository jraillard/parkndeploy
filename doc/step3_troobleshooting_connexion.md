First : let's open chrome debugger, on network page and reload

you see ? the frontend is calling the backend on the same url ...

but you're url isnt there at all 

in a normal application , we might have create an environment file that contains a key to store the backend url.


we could then edit it before building the app and send it to the static web app.

finally you would have to setup cors policy on backend, et voilà !

but that's not the way static web apps works.

we'll have to use static web apps links and add our azure app service on it.

to do so we'll first have to upgrade the swa plan to standard (not a free one for sure).

and then create the link bicep resource.

by default what swa does is that if you make a call like : myswa.com/api/my-endpoint ; it redirects to linked-backend-url.com/api/my-endpoint

remember this ? in frontend and backend readme we were talking about the use of a basePath "/api"

thats only for this reason that we use it :D 

:warning: seems defining linked backend and swa in same files might sometimes cause whether not to find the resource or internal server error 
=> create a separate module seems to work
=> maybe "dependsOn" clause would solve it too (even if bicep should be doing it alone with "parent" clause :/)

:warning: => now your backend only accept requests from the static web app (that's another consequence to azure static web app links)
add cors policy on your backend could resolve it