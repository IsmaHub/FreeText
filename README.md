# free-text
A library that allows you write in any element of the DOM like the **Typed.js** library but more simple.

## Example
[To plunker example](https://plnkr.co/edit/DKFUHRiyAGcAjnJeK8WX?p=info)

## Install
[GitHub repository](https://github.com/IsmaHub/FreeText)

You can get the content of the file ``index.js`` in ``./dist`` or via NPM.

### NPM:

```
   npm install free-text --save 
```



## Getting started
>**Important:** This library use **jQuery**. You need have installed jQuery for can use *free-text* library.
>

For this example we have a ``index.html`` file in the root of the proyect. We have put inner the ``HEAD`` tag of html body the link of this library.

```html
<head>
    <!-- load jQuery -->
    <script src="jquery.js"></script>
    
    <!-- load free-text library -->
    <script src='./node_modules/free-text/index.js'></script>
</head>
```

Now we create a ``H1`` tag in the body with an ``id`` to be able to find it.

```html
<body>
    <h1 id='target'></h1>
</body>
```

And now, we write the code for instantiate a ``FreeText`` object which will does the magic.
Only require invoke the **autowriting** function which needs receive a object as param. This object only require two properties:

1. An array of strings with the words or sentences that it will writes. 
2. And a string of CSS selector type of the element (in this case ``'#target'``).


We write the script below of ``BODY`` tag.

 ```html
 <script>
        const FTX = new FreeText();
        //The autowriting method return the object that we need to make the animation.
        var autowriting = FTX.autoWriting({
            element:'#target',  //the CSS selector of the DOM element.
            words: ["I'm the first sentence", 'Hello word!', 'awesome'] //sentences or words that will do write
        }).start(); //the start function begin the animation.
 </script>
 ```

## API

### FreeText Object

### autoWriting( options )
Return the autoWriting object.

 Options:
 * **element**: *String*. Css selector of the DOM element target. Require.
 * **keepWord**: *Int*. Time to stay the words, in milliseconds. Optional. Default: 800.
 * **loop**: *Boolean*. Indicates if this autowriting is a loop or not. Optional. Default: true.
 * **words**: *Array*. Array of strings that contained the words or sentences that autowriting will writes. Optional. Defauls: empty array.
 * **speedDelete**: *Int*. Speed to delete the letters, in millisecons. Optional. Default: 30.
 * **speedWrite**:  *Int*. Speed to add the letters, in millisecons. Optional. Default: 100.
 * **hideCursorToEnd**: *Boolean*. Only has effect if param **loop** is false. Hides the cursor when autowriting object has written the array words complete. Optional. Default: true.

### autoWriting object 
#### Methods:

* **start()**: Start the writing.
* **stop()**: Freezes the writing.
* **continue()** Remove the effect of *stop()*.
* **clear()**: Delete all the written.
* **setWords( [string] )**: Set the ``words`` param.
