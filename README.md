# Redis Bigfoot Search

## Step 1.

To get this up an running, you'll need to generate some data first. I've got a [handy Python project](https://github.com/guyroyse/bigfoot-redis) that will generate all the Redis commands you'll need. Go and make that work first.

## Step 2.

Get you a copy of Redis running. Doesn't really matter how. [Docker](https://hub.docker.com/_/redis) is a good choice. Or just [compile it from source](https://redis.io/download). Don't let me tell you how to live your life.

## Step 3.

Now to run the actual thing. First, install all the things:

    $ npm install

Then start the server up:

    $ npm start

From there, just navigate to `http://localhost:4000/` and play around. Here a sample queries:

    {
      sightings(state: "Ohio", county: "Athens County", classification: "Class A") {
        title
        state
        date
        county
        location {
          latitude
          longitude
        }
      }
    }

Look at the code to figure out some more! And have fun squatching!
