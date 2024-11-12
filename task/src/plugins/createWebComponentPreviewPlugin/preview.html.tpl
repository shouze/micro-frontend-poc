<!DOCTYPE html>
<html>
  <head>
    <title>Preview Web Component</title>
    <link rel="stylesheet" href="/variables.css" />
    <style>
        :root {
            background-color: var(--fulll-background-color-dark);
        }
        @media (prefers-color-scheme: light) {
          :root {
              background-color: var(--fulll-background-color-light);
          }
        }
    </style>
  </head>
  <body>
    {{webComponent}}
    <script type="module" src="{{scriptPath}}"></script>
  </body>
</html>