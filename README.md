# Flask.js
A Node.Js implementation made to mimic Flask API as closely as possible. 

### To run 
- Run ` npm install `
- For reloading Development server, run ` npm run live `
- For server, run ` node app.mjs `

### File Structure

- Errors.mjs contains error handling and HTTP error classes. 
- Flask.mjs is the only module to be imported by user. 
- router.mjs provides access to a Trie datastructure that holds all the URLpatterns 
- app.mjs is the end app that can use flask. Any view can return a JSON string, or HTML or [ response, statusCode ]

### 
