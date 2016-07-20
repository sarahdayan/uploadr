# Uploadr
## Make file inputs pretty, on all platforms.

File inputs are the most annoying form elements.
They never look the same across browsers, and they're the toughest thing to customize.

Uploadr makes it dead simple to create outstanding file inputs that entirely fit in your website.

Please visit: [https://sarahdayan.github.io/uploadr](https://sarahdayan.github.io/uploadr)

## Features

### Cross-browser

Uploadr works on all major browsers,
old and new. Even IE8. No shit.

### Highly customizable

Plugins must adapt to you, not the other way around. Uploadr comes 100% vanilla
with an optional theme.

### Lightweight

The minified version of Uploadr.js
is only 2KB.

## How to use Uploadr

### Include JQuery and Uploadr

Uploadr works with JQuery, so you'll need to add JQuery then Uploadr for it to work properly. Be careful if you use multiple JavaScript libraries: Uploadr is made to avoid conflicts, but you never know what might happen.

If you need IE8 compatibility, use JQuery 1.x.

<pre>
&lt;script src=&quot;js/jquery-1.11.3.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;js/uploadr.min.js&quot;&gt;&lt;/script&gt;</pre>

### Include your input

Three words are at the core of Uploadr: make things easy.
The only thing you need to do is to include your input file and give it a class or an id (whichever you want), we take care of the rest.

<pre>
&lt;input type=&quot;file&quot; name=&quot;uploadr&quot; id=&quot;uploadr&quot;&gt;</pre>

### Add some style

You're free to use the Uploadr theme or not, but it still needs a few lines of CSS to work properly. Either include uploadr.min.css in your page, or copy-paste the code in your own CSS stylesheet.

<pre>
.uploadr .uploadr-buttons {
  position: relative;
}

.uploadr .uploadr-buttons,
.uploadr .uploadr-button {
  display: inline-block;
}

.uploadr .uploadr-button {
  cursor: pointer;
}

.uploadr input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  cursor: pointer;
}

.uploadr.uploadr-new .uploadr-exists,
.uploadr.uploadr-exists .uploadr-new {
  display: none;
}</pre>

### Unleash the beast

Everything is set up, now you just need to pull the trigger. To fire Uploadr, just add the following piece of code within a <code>&lt;script&gt;</code> tag in your page (or directly in your script page if you have one) and voilà!

<pre>
$(function() {
  $('#uploadr').uploadr();
});</pre>

### Options

Uploadr comes with a few options to help you adapt it to your design.

**layout**
*default: 'default*'
What layout style the plugin will render in.
**displayPreview**
*default: true*
Should the plugin display a preview of the selected file.
**deleteButton**
*default: true*
Should the plugin display a delete button once the file is selected.
**loadButtonText**
*default: 'Load a file*'
What text should the load button show.
**changeButtonText**
*default: 'Change*'
What text should the change button show.
**deleteButtonText**
*default: 'Delete*'
What text should the delete button show.
**addFileEvent**
*default: function() {}*
What else should happen when a file is added.
**changeFileEvent**
*default: function() {}*
What else should happen when a file is changed.
**deleteFileEvent**
*default: function() {}*
What else should happen when a file is deleted.

<pre>
$('.uploadr').uploadr({
  layout: 'default',              // 'default' or 'inline'
  displayPreview: true,           // true or false
  deleteButton: true,             // true or false
  loadButtonText: 'Load a file',  // any string
  changeButtonText: 'Change',     // any string
  deleteButtonText: 'Delete',      // any string
  addFileEvent: function() {},    // any function
  changeFileEvent: function() {}, // any function
  deleteFileEvent: function() {}  // any function
});</pre>

### Events

Some people like options, others prefer events. Whatever your preference is, sometimes you just need to fire an event in specific curcumstances, and adding that logic directly within an option can become cumbersome and unreadable rather quickly.

That's why you can call every event option directly with Uploadr's custom events, anywhere in your code.

**addFile**
This event fires immediately when a file is added.
**changeFile**
This event fires immediately when a file is changed.
**deleteFile**
This event fires immediately when a file is deleted.

*Example*

<pre>
$('#uploadr').on('addFile', function() {
  // do stuff whenever a file is added
});</pre>

### Optional — Uploadr theme

We got you covered even if design isn't your cup of tea. Uploadr theme is extremely simple, unobtrusive and easy to integrate in an existing design.

<pre>
&lt;link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;css/uploadr-theme.min.css&quot;&gt;</pre>

## Credits

### Feedify

My name is Sarah Dayan and I'm the one behind Uploadr.
The website uses [Outline](http://www.getoutline.com), my lightweight micro-framework.