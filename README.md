Elasticsearch for Everything
============================
A short (~20m) presentation demonstrating practical uses for Elasticsearch beyond simple search.
See the video: http://vimeo.com/blacklocus/dev-and-data-2013-elasticsearch-for-everything

## To use
1.  Set up an elasticsearch cluster. For best visual effect, consider one consisting of more than one node.
2.  Install the [elasticsearch-head plugin](http://mobz.github.com/elasticsearch-head/) on a node in the cluster.
    Alternatively, just have elasticsearch-head locally, and connect it to a node on the cluster.
3.  Adjust `libraries/addyosmani-todomvc-d41638c/architecture-examples/backbone/js/collections/todos.js` to point the
    `TodoList` `url` to an HTTP endpoint of a node in your elasticsearch cluster if other than http://127.0.0.1:9200...
4.  Set up an index for Twitter tweets. You'll want to make sure the `created_at` date format is set to Twitter's
    format. See [this wiki page](https://github.com/JustinTArthur/ElasticsearchForEverything/wiki/Tweets-Schema) for the
    schema I used. You can PUT just the `created_at` mapping if you want; auto-mapping does fine for the other
    fields.
5.  Load a Twitter archive into that elasticsearch index. I used
    [ElasticTweets](https://github.com/AdaTheDev/ElasticTweets) to load my downloaded Twitter archive.
6.  Open deck.html in a modern web browser. Consider opening developer browser tooling that can demonstrate HTTP
    connections for technical audiences.

## License
The contents of this slide deck, with the exception of included 3rd-party libraries, is licensed as Creative Commons
Attribution License version 3.0. See LICENSE.md for the full terms of this license. Attribution for the slide content
should be given to the original author: Justin Turner Arthur.
This section will be amended with the names of major collaborators if such collaboration occurs.

Third party inclusions:

*   [TodoMVC](https://github.com/addyosmani/todomvc/) is modified and used under the MIT License.
*   [deck.js](https://github.com/imakewebthings/deck.js) is used under the MIT License.
*   UNOFFICIAL GITHUB LATEST COMMITS WIDGET by [TylerH](https://github.com/TylerLH/) is used, but not included in this
project. Source is publicly available under Apache License, Version 2.0.