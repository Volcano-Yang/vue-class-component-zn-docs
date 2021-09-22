const moment = require("moment");
let env = process.env.MY_WEPACK_ENV || "prod";
let valineConfig = {};
if (env === "dev") {
  const { leanCloud } = require("./secrets");
  valineConfig = {
    appId: leanCloud.appId,
    appKey: leanCloud.appKey,
    avatar: "monsterid",
  };
} else {
  valineConfig = {
    appId: process.env.COMMENT_APPID,
    appKey: process.env.COMMENT_APPKEY,
    avatar: "monsterid",
  };
}

module.exports = {
  title: "杨灿就是杨火山",
  description: "",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    // 配置评论插件，这里APPId和appKey需要换成自己的在leanCloud上的
    valineConfig,
    subSidebar: "auto", //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    nav: [
      {
        text: "首页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "留言板",
        icon: "reco-suggestion",
        link: "/messageBoard", // messageBoard 只是自行新建的文件名，可自行命名
      },
    ],
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
      socialLinks: [
        // 信息栏展示社交信息
        { icon: "reco-github", link: "https://github.com/Volcano-Yang" },
        {
          icon: "reco-juejin",
          link: "https://juejin.cn/user/2383396940547821/posts",
        },
        {
          icon: "reco-zhihu",
          link:
            "https://www.zhihu.com/people/yang-can-jiu-shi-yang-huo-shan/posts",
        },
        {
          icon: "reco-wechat",
          link: "https://qny.volcanoblog.cn/markdown/公众号图片.png",
        },
        {
          icon: "reco-csdn",
          link: "https://blog.csdn.net/qq_40618238?spm=1001.2100.3001.5343",
        },
        { icon: "reco-mail", link: "mailto:648941183@qq.com" },
      ],
    },
    friendLink: [
      {
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com",
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com",
      },
    ],
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "Volcano-Yang",
    authorAvatar: "/avatar.jpeg",
    record: "粤ICP备20006742号",
    startYear: "2021",
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    // 图片预览插件
    ["photo-swipe"],
    // 自动生成侧边栏的插件
    [
      "vuepress-plugin-auto-sidebar",
      {
        collapse: {
          open: true,
        },
      },
    ],
    // 文章最后更新时间转换
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          moment.locale(lang);
          return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
        },
      },
    ],
    // 复制代码功能
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功!",
        },
      },
    ],
    // 看板娘
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        clean: true,
        theme: ["haruto"],
      },
    ],
  ],
};
