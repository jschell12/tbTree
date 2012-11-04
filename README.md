tbTree - Twitter Bootstrap Tree Navigator
======
This jQuery plugin was created to provide a simple tree like navigation using Twitter Bootstrap css for styling.

NOTE: This plugin is in early stages of development and was originally intended for a faceted search component to use in conjunction with the [DataTables](http://datatables.net/) plugin.

### Similar plugin
[tbtree](https://github.com/nicholascloud/tbtree) by nicholas cloud.

## Demo
[Here is a demo](http://jsfiddle.net/jschell12/wMDt6/1/)

## Options
tbTree takes the following options:
* truncate: [<i>Integer</i>] - this is an integer that specifies the length of the branch or leaf text
* treeLayout: [<i>Object</i>] - structure json object that is used to define the tree layout
* preToggle: [<i>function</i>] - callback hook fired before toggle event
* postToggle: [<i>function</i>] - callback hook fired before toggle event
* sortable: [<i>Boolean</i>] - allows items to sortable (using jquery ui's sortable plugin) (beta)

## Usage ##
Here is an example definition of the plugin:

```javascript
var $tree = $(".tbTree").tbTree({
        preToggle: function(e, elem, label, level, childrenCount){
            console.log("pre toggle");
        },
        postToggle: function(e, elem, label, level, childrenCount){
            console.log("post toggle");            
        },
        treeLayout: [{
            label: "Node 1",
            children:  [{
                label: "Node 1.1",
                children: [{
                    label: "Node 1.1.1",
                    children: [{
                        label: "Node 1.1.1.1",
                        children: [],
                    },{
                        label: "Node 1.1.1.2",
                        children: [],
                    }],
                }],
            },{
                label: "Node 1.2",                
                children: [{
                    label: "Node 1.2.1",
                    children: [{
                        label: "Node 1.2.1.1",
                        children: [],
                    },{
                        label: "Node 1.2.1.2",
                        children: [],
                    }],
                }],
            }],
        
        },{
            label: "Node 2",
            children: [{
                label: "Node 2.1",
                children: [],
            },{
                label: "Node 2.2",
                children: [],
            }],
        }]
    }); 
```

## Requirements
* [jQuery](http://jquery.com/) v. 1.6+
* [jQuery UI](http://api.jqueryui.com/) v. 1.9+
* [Bootstrap CSS Toolkit](https://github.com/twitter/bootstrap/) v. 2.1+ (optional)
 
The User Interface is built with Twitter's [Bootstrap](https://github.com/twitter/bootstrap/) Toolkit. This enables a CSS based, responsive layout and fancy transition effects on modern browsers.


## Desktop browsers (tested)
* Google Chrome
* Microsoft Internet Explorer 6.0+
