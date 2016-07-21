# jquery-validatation用法总结
- 一款基于[jquery](https://jquery.com/)的表单验证，[jquery-validation](http://plugins.jquery.com/validation/)

- 通过`name`值来验证，必须加入该属性

- 通过`$('#fromId').validate()`触发验证方法

- 回调方法：

  ```js
  $.validator.setDefaults( {
    submitHandler: function () {
      alert( "提交表单" );
    }
  } );
  ```


- `validate`方法中的属性：`rules` 设置规则，`messages` 错误信息
