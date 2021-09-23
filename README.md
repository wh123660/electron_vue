# electron_vue项目
## 内部vue为vue create App命令创建的
---


## 项目中所用到的库的安装
```
yarn
```

### 开发环境运行命令
```
yarn serve
```

### 项目打包到dist文件夹里面
```
yarn build
```

### 打包完dist之后试运行桌面App
```
yarn buildexe
```

### 打包成exe文件 windows使用
```
yarn builder
```

### 输出配置pakcage.json:
```
  "build": {
    "directories": {
      "output": "build/out/",
      "buildResources": "/dist/*"
    },
  }
  根目录里面会找到这个文件夹build/out/
```


### 配置升级路径
```
  "build": {
    "win": {
      "publish": {
        "provider": "generic",
        "url": "http://****.***/***/"
      }
    }
  }
  升级配置完生成文件之后把生成好的两个文件放到服务器对应的位置上
  必须是这两个文件：
  latest.yml
  testvue Setup 0.1.0.exe
  如果后面需要升级，只需要把package.json里面的版本号改下重新打包上传就可以了
  
```

### 
```

```

### 
```

```

### 
```

```

### 
```

```