# About Zingbot

Zingbot is an experimental rewrite of Arduino-over-the-web projects <a href="https://github.com/mapmeld/crowdbot">CrowdBot</a> and <a href="https://github.com/mapmeld/crowdbotblock">CrowdBotBlock</a>.

## Key Features

- Code editor and viewer powered by <a href="http://codemirror.net">CodeMirror</a>.

- Users, programs, and data to be stored in a <a href="http://neo4j.org">Neo4j</a> graph database

- Lowering barrier to livestream by showing a live, updating picture of the robot on the homepage

- Lowering barrier to submitting code by letting users edit and submit a program on the homepage

- Pop-up code help using Bootstrap popovers

# About Node-Neo4j Template

<a href="https://github.com/aseemk/node-neo4j-template">Node-Neo4j Template from aseemk</a> simplifies the use of [Neo4j][] from Node.js. It uses the
[node-neo4j][] library, available on npm as `neo4j`.

## Installation

```bash
# Install the required dependencies
npm install

# Download and install Neo4j 1.8 locally
curl "http://dist.neo4j.org/neo4j-community-1.8-unix.tar.gz" --O "db-unix.tar.gz"
tar -zxvf db-unix.tar.gz 2> /dev/null
rm db-unix.tar.gz
```

## Usage

# Start the local Neo4j instance
neo4j-community-1.8/bin/neo4j start

# Run the app!
npm start

The app will now be accessible at [http://localhost:3000/](http://localhost:3000/).

# Uploading to Heroku

## Create the app and add a neo4j 1.8 addon

    heroku create APP_NAME
    heroku addons:add neo4j --neo4j-version 1.8.1
    git push heroku master

## Miscellany

- MIT licensed.

[Neo4j]: http://www.neo4j.org/
[node-neo4j]: https://github.com/thingdom/node-neo4j

[coffeescript]: http://www.coffeescript.org/
[streamline]: https://github.com/Sage/streamlinejs
