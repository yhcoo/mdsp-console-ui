

# MDSP
MDSP ：（Mobile Dynamic Service Platform）移动动态服务平台。
该项目基于Spring cloud Alibaba,Oauth2,基于VUE, element-ui ,
axios , echarts 的后台权限管理框架,集成了基于MQ的可靠消息的分布
式事务解决方案。该项目将提供对 Taro ,RN, MDS 等框架开发的移动端应
用做运维发布支持。

### 架构摘要
#### 服务鉴权
通过`JWT`的方式来加强服务之间调度的权限验证，保证内部服务的安全性。
![server.png](docs/img/server.png)

#### 监控
目前主要的一些 APM 工具有: Cat、Zipkin、Pinpoint、SkyWalking，这里使用 SkyWalking ，它是一款优秀的国产 APM 工具，包括了分布式追踪、性能指标分析、应用和服务依赖分析等。
![skywalking1.png](docs/img/skywalking1.png)

#### 服务注册与调用
基于Nacos来实现的服务注册与调用，在Spring Cloud中使用Feign, 我们可以做到使用HTTP请求远程服务时能与调用本地方法一
样的编码体验，开发者完全感知不到这是远程方法，更感知不到这是个HTTP请求。
![tsc.png](docs/img/nacos.jpg)

#### 负载均衡&熔断机制
采用了`Sentinel` 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度来帮助您保护服务的稳定性。
![tsc.png](docs/img/sentinel.jpg)

#### 分布式事务方案
基于mq最终一致性实现可靠消息的分布式事务方案。
![tsc.png](docs/img/tsc.png)


## 功能展示
![tsc.png](docs/img/menu.jpg)
![tsc.png](docs/img/role.jpg)
![tsc.png](docs/img/log.jpg)
![tsc.png](docs/img/createcode.jpg)


## 环境准备
克隆项目到本地

```node
npm install
```

## dev

```node
npm run dev
```

## build

```
npm run build
```



## 前端启动参照前端项目
>  传送门：[后端项目地址](https://github.com/mdsp-team/mdsp) 



# donate

- 如果我们的项目对您有帮助，欢迎捐赠
- 若获得足够的捐赠，将购置服务器发布项目

<table>
  <tr>
    <th width="50%">支付宝</th>
    <th width="50%">微信</th>
  </tr>
  <tr></tr>
  <tr align="center">
    <td><img width="50%" src="https://github.com/mdsp-team/mdsp/blob/master/docs/img/zfb.jpg"></td>
    <td><img width="50%" src="https://github.com/mdsp-team/mdsp/blob/master/docs/img/wxf.jpg"></td>
  </tr>
</table>






