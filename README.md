# socrata.js

socrata.js is a JavaScript library for querying Socrata data sources.
For more information about Socrata, see their [offical website](http://www.socrata.com/).

## API

### DatasetManager

The primary class in socrata.js is the `DatasetManager`. You initialize the
`DatasetManager` with the URL of the Socrata data source you want to work
with. For example, to work with the City of Chicago towed car database,
you would create a `DatasetManager` like this:

`var towedCarDataset = new Socrata.DatasetManager("http://data.cityofchicago.org/Transportation/Towed-Vehicles/ygr5-vcbg");`

The `DatasetManager` currently exposes the following methods:
`getDataset` - pulls back all data from a data source
`search` - allows you to use a search term to search the data source
`filterRows` - allows you to filter the data

### getDataset(callback)

`getDataset` returns all the data from the given data source. To work with
the data, you pass in a callback function that takes in a dataset
variable. This variable an object with a property `rows` that contains the
data and property `columns` that contains metadata. For example, using
the towed car dataset inititalized above, to log licence plate number
of every towed car, you would do the following:

    towedCarDataset.getDataset(function(dataset) {
      for(i=0; i<dataset.row.length; i++) {
        console.log(dataset.rows[i]["Plate"]);
      }
    });

In this case, I knew the column I wanted was named "Plate" simply by
visiting the Chicago Data Portal URL and looking at the column name.
You could also get column names from `dataset.columns`, which is a list
of objects, each of which has a `name` property.

### search(searchTerm, callback)

You work with the data in `search` the same way as in `getDataset`
except that you pass in a string parameter as a search term. The
callback method then works the same as in `getDataset` but the dataset
returned will be filtered based on the search term. Note that is the
equivalent of what is described under **Performing Simple Text Searches**
at [this link](http://dev.socrata.com/deprecated/querying-datasets), so
you want to go there to get a better understanding of how this
search works. Note that the search happens server side, so you limit
the size of the data coming back by using search.

### filterRows(filterFunction, callback)

`filterRows` lets you filter results by passing in a filter function.
You then work with the data in the same way as in the other methods.
For example, using the above towed cars dataset, to work with only
the cars that are white, you could do the following.

    towedCarDataset.filter(function(row) { return row["Color"] == "WHI"; }, function(dataset) {
      ...
    });

Please note that unlike search, this method **pulls back all data and
filters it client side.** So while this might be a convenient way of
filtering data, you still pull back all of the data. Socrata does allow
for more advanced querying, but their API requires this to be done by
POSTing, so I've been unable to implement this in a JavaScript library
since the same origin policy restricts POSTs to another domain.
