# ParkNDeploy Frontend

`ParkNDeploy Frontend` is a Single Page Application (SPA) build with [React](https://fr.react.dev/) & [Vite](https://vite.dev/).

## Features

As simple is the keyword of this course, the UI is showing a basic Parking galery that you could filter with the name through a search bar.

Data are retrieved from our `ParkNDeploy API` which deliver content about Parkings in Angers (France).

## Implementation

Some libraries are used to enhance the app : 

- [Axios](https://axios-http.com/docs/intro) : replacing the classic `fetch` method in JavaScript for 
- [ReactQuery](https://tanstack.com/query/latest/docs/framework/react/overview) : combined with `Axios` for asynchronous data fetching and caching
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) : replacing the [react stores feature](https://legacy.reactjs.org/docs/context.html)
- [React Icons](https://react-icons.github.io/react-icons/) : guess the name is relevant enough :eyes:
- [ShadcnUI](https://ui.shadcn.com/) : component platform to copy / paste / adapt easily customizable ui components
- [TailwindCSS](https://tailwindcss.com/docs/installation) : combined to ShadcnUI to manage the styling

## Run 

As mentionned in [main README file](../README.md#frontend) :

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