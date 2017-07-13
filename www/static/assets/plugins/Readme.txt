This folder include all needed plugins for a specific area.
Example: if js/scripts.js detects that you need toatr plugin, only then, toastr plugin is loaded.

Using this technique, you do not need to add manually all plugins on each page.
In this way, the webpage stay lightweight and faster.

We recommend to not delete these plugins - except if you realy do not need them.
Otherwise, you'll get javascript errors. So if do not need toatr plugin on your website, only then you can remove it!


--------------------------------------------------------------------------------------------------------------------------------------------------------
typeahead.bundle.js - MODIFIED
FROM THIS
this.limit = o.limit || 5;
TO THIS
this.limit = o.limit || 1000;