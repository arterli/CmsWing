![goup_logo](https://googledrive.com/host/0B3RKPTAd6l8OeDBsT0dDa1lMLXM/goup_logo_mini.jpg)

#### Easy Peasy
Download the minified version of the plugin, include it after jQuery and:
```
<script type="text/javascript">
$(document).ready(function(){
    $.goup();
});
</script>
```

### Demo
Yeah! You can see a live demo here: http://ryuk87.github.io/jquery-goup/

### Options

| Name            	| Description                                                                                    | Type    | Default        |
|-------------------|------------------------------------------------------------------------------------------------|---------|----------------|
| `location`        | On which side the button will be shown ("left" or "right")                                     | String  | right          |
| `locationOffset`  | How many pixel the button is distant from the edge of the screen, based on the location setted | Integer | 20             |
| `bottomOffset`    | How many pixel the button is distant from the bottom edge of the screen                        | Integer | 10             |
| `containerSize` 	| The width and height of the button (minimum is 20)                                     		 | Integer | 40             |
| `containerRadius` | Let you transform a square in a circle (yeah, it's magic!)                                     | Integer | 10             |
| `containerClass`  | The class name given to the button container                                                   | String  | goup-container |
| `arrowClass`      | The class name given to the arrow container                                                    | String  | goup-arrow     |
| `containerColor`  | The color of the container (in hex format)                                                   	 | String  | #000 			|
| `arrowColor`      | The color of the arrow (in hex format)	                                                     | String  | #fff           |
| `trigger`         | After how many scrolled down pixels the button must be shown (bypassed by `alwaysVisible`)     | Integer | 500            |
| `entryAnimation`  | The animation of the show and hide events of the button ("slide" or "fade")				     | String  | fade           |
| `alwaysVisible`   | Set to true if u want the button to be always visible (bypass `trigger`)                       | Boolean | false          |
| `goupSpeed`		| The speed at which the user will be brought back to the top ("slow", "normal" or "fast")       | String  | slow           |
| `hideUnderWidth`  | The threshold of window width under which the button is permanently hidden                     | Integer | 500            |
| `title`           | A text to show on the button mouse hover                                                       | String  | ''             |
| `titleAsText`     | If true the hover title becomes a true text under the button                                   | Boolean | false          |
| `titleAsTextClass`| The class name given to the title text                                                         | String  | goup-text      |

### Changelog
#### v1.0.0 (11-19-2014)
* Added button size

#### v0.7.0 (11-19-2014)
* Fixed multiple click bug (issue #4)
* Some code changes

For more changelog info check the `CHANGELOG.md` file.

### License and Copyright
jQuery GoUp! is dual licensed under the [GPL](http://www.gnu.org/licenses/gpl.html) and [MIT](http://www.opensource.org/licenses/mit-license.php) licenses.

(c) 2014-2016 Daniele Lenares

Logo kindly created by [Emilia Balitro](http://www.behance.net/EmiliaBalitro)

If you like my work, offer me a beer/coffee/cappuccino on [Gratipay](https://gratipay.com/Ryuk87/)
