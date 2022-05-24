---
title: 微前端qiankun的使用
date: 2022-05-24
tags:
 - React QS
categories:
 - React
---

## 微前端qiankun （umi的配置）（父子app都为umi框架）


# 父应用配置
+ 父应用config.ts
  ### name是子应用的package.json的name entry 注册子应用的地址
```ts
const BASE_URL_BOARD: string = '//192.168.57.16:4300';
```
```ts
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'andon-workshop', // 唯一 id
          entry: BASE_URL_BOARD, // html entry
        },
      ],
    },
  },
```
+ 父应用app.ts

- routes 自定义子应用的地址 
- path 为子应用的路由
- microApp 子应用的name
```ts
const apps = [
  {
    name: 'andon-workshop', // 唯一 id
    entry: BASE_URL_BOARD, // html entry
  },
];

export const qiankun = () => {
  return Promise.resolve({
    // 注册子应用信息
    apps,
    // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
    lifeCycles: {
      afterMount: () => {},
    },
    routes: [
      {
        path: '/QianKun/AndonBoard',
        microApp: 'andon-workshop',
        microAppProps: {
          autoSetLoading: true,
          className: 'myContainer',
          wrapperClassName: 'myWrapper',
        },
      },
    ],
    // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
  });
};
```
+ package.json需要
```ts
{
    "@umijs/plugin-qiankun": "^2.37.2",
    "qiankun": "^2.7.0",
}
```
+ 注意>>>>> 父应用的根节点id='root' 会自动变成id='root-master'，关于#root的所有css需要修改






# 子应用配置

+ 子应用config.ts
```ts
  routes: [{ path: '/', component: '@/pages/AndonBoard' }],
  qiankun: {
    slave: {},
  },
```
+ app.ts
```ts
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('app1 unmount', props);
  },
};
```
+ package.json (name保持和父应用定义的的子应用name一样)
```json
{
    "name": "andon-workshop"
    "@umijs/plugin-qiankun": "^2.37.2",
}
```