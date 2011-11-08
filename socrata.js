Socrata = (function(Socrata, $, undefined) {

  //DatasetManager {{{
  Socrata.DatasetManager = (function() {

  var host, uid;

    function DatasetManager(url){
      if (url === undefined) {
        throw new Error("DatasetManager constructor expects URL parameter");
      }
      extractUID(url);
      extractHost(url);
    }

    DatasetManager.prototype.getDataset = function(callback) {
      var dataset = new Socrata.Dataset();
      var rurl = rowsUrl();
      var curl = columnsUrl();
      $.getJSON(curl, function(columnData) {
        dataset.columns = columnData;
        $.getJSON(rurl, function(rowData) {
          var zippedObjectArray = [];
          for (i=1; i<rowData.data.length; i++) {
            zippedObjectArray.push($.zip(rowData.data[0], rowData.data[i]));
          }
          dataset.rows = zippedObjectArray;
          callback(dataset);
        });
      });
    };

    DatasetManager.prototype.filterRows = function(filterFunction, callback) {
      this.getDataset(function(dataset) {
        var filteredDataset = dataset;
        filteredDataset.rows = $.grep(dataset.rows, filterFunction);
        callback(filteredDataset);
      });
    };

    //private methods {{{
    extractUID = function(url) {
      matches = url.match(/.*([a-z0-9]{4}-[a-z0-9]{4}).*/);
      if ( matches == null || matches.length < 2 ) {
        return false;
      }
      uid = matches[1];
      return true;
    };

    extractHost = function(url) {
      matches = url.match(/^(?:[^\/]+:\/\/)?([^\/]+)/im);
      if ( matches == null || matches.length < 2 ) {
        return;
      }
      host = "http://" + matches[1];
    };

    jsonWrap = function(url) {
      return host + url +
        (url.indexOf('?') == -1 ? '?' : '&') + 'jsonp=?';
    };

    columnsUrl = function() {
      return jsonWrap("/views/" + uid + "/columns.json");
    };

    rowsUrl = function() {
      return jsonWrap("/views/" + uid + "/rows.json");
    };
    //}}}

    return DatasetManager;
  })();
  //}}}

  Socrata.Dataset = (function() {
    function Dataset() {
      this.rows = [];
      this.columns = [];
    }

    return Dataset;
  })();

  return Socrata;
}(window.Socrata = window.Socrata || {}, jQuery));



