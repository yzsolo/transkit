# transkit
自用命令行翻译工具

## Installation
```
npm i -g transkit
```
## Usage
```
  Options:

    -V, --version  output the version number
    -z, --zh       to Chinese（中文）
    -e, --en       to English（英文）
    -j, --ja       to Japanese（日语）
    -k, --ko       to Korean（韩语）
    -f, --fr       to French（法语）
    -r, --ru       to Russian（俄语）
    -p, --pt       to Portuguese（葡萄牙语）
    -x, --es       to Spanish（西班牙语）
    -v, --vi       to Vietnamese（越南语）
    -h, --help     output usage information
```
```
//无参（默认翻译为中文）
transkit <your word> 
//有参
transkit <your word> -option
```
or
使用alias
```
alias <your shortcut>="transkit"
eg：alias ds＝"transkit"
```
配置好之后，执行source，之后的使用方式如下：
```
ds hello
```
![Imgur](https://imgur.com/oRm1Gpt.png)
或是有小语种翻译需求的话，可以使用扩展功能：
```
//葡萄牙语
ds hello -p 
```
![Imagur](https://imgur.com/1y0w8qu.png)
```
//西班牙语
ds hello -x
```
![Imagur](https://imgur.com/B6WSChe.png)


[开发有感](https://github.com/yzsolo/yzsolo.github.io/issues/26 "开发有感")

😄😄😄
