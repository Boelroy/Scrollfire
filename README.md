#ScrollFire

###这是什么
***
根据页面向下滚动动态现实各元素动画的jQuery插件


#用法

### Simple use with jQuery
```javascript
//simple as this!
$('.scroll-fire').scrollFire()
```

***
你必须在你的想运用动画的页面添加一些data-*属性

```html
<div class='scroll-fire' data-offset='200' data-delay='100' data-animate='someCustomAnimation'>
```
***
* data-offset 表示元素从离底部多长距离时元素会显示动画
* data-delay 表示元素在触发动作后多长时间后才会显示动画
* data-animate 表示显示动画类型的class名,这里推荐[Animate.css](http://daneden.github.io/animate.css/)

### Single or Group
*** 
scrollfire.js 默认的single模式表示对于当前元素只要满足条件就会触发动画
当然你可以显示调用

```javascript
$(selector).scrollFire({model:'single'});
```
***
而group模式表示触发一组动画，即当元素满足条件时其下的子元素的动画都会触发，当然我们要指定子元素的选择器,默认子元素的选择器为'.scroll-fire-item'

```javascript
$(selector).scrollFire({
        model: 'single',
        groupItem: '.scroll-fire-item'
    });
```

## License

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).