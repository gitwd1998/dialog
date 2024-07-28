## 自定义嵌套表格弹窗

> IE8- 版本和低版本火狐浏览器不支持

### 引入

> 先引入jquery 再引入_dialog.js

```html
  <script src="../js/jquery-1.8.2.js"></script>
  <script src="../js/_dialog.js"></script>
```

### 使用

```js
  $.dialog_open(options) // 打开弹窗
  $.dialog_close() // 关闭弹窗
```

### options [Object]

| 属性 | 可选 | 默认值 | 类型 | 描述 |
| - | - | - | -| - |
| title | 选填 | '' | String | 弹窗左上角标题 |
| width | 选填 | 800 | Number/String | 弹窗宽度 |
| groups | 选填 | [] | Array| 弹窗底部标签组 |
| columns | 选填 | [] | Array | 弹窗表格列数据 |
| datas | 选填 | [] | Array | 弹窗表格行数据 |
| operates | 选填 | [] | Array | 弹窗表格操作列标签组 |
| onclose | 选填 | null | Function | 弹窗右上角关闭按钮回调函数，无参数，当执行完业务代码需要关闭弹窗时调用 $.dialog_close() |

### groups

| 属性 | 可选 | 默认值 | 类型 | 描述 |
| - | - | - | - | - |
| name | 选填 | '' | String | 标签的内容，可以是html字符串 |
| tag | 选填 | button | String | 弹窗底部单个标签名 |
| id | 必填 | - | String | 标签的唯一id值 |
| fun | 选填 | null | Function | 点击标签触发函数，无参数，当执行完业务代码需要关闭弹窗时调用 $.dialog_close() |


### columns

| 属性 | 可选 | 默认值 | 类型 | 描述 |
| - | - | - | - | - |
| name | 必填 | '' | String | 表格当前列表头 |
| prop | 必填 | - | String | 表格当前列字段和datas中的字段对应，index为预留序号列字段，尽量不要使datas中的字段与之重复；operates为预留操作列字段，尽量不要使datas中的字段与之重复 |
| align | 选填 | center | String | 表格当前列对齐方式 |
| width | 选填 | - | String | 表格当前列宽 |

### operates

| 属性 | 可选 | 默认值 | 类型 | 描述 |
| - | - | - | - | - |
| name | 选填 | '' | String | 标签的内容，可以是html字符串 |
| tag | 选填 | button | String | 表格操作列单个标签名 |
| class | 必填 | - | String | 标签的className |
| fun | 选填 | null | Function | 点击标签触发函数，三个参数分别是 ev：事件对象；row：当前行数据；index：当前行索引 |

