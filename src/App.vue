<template>
  <div id="app">
    <navigation>
      <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  created() {},
  mounted() {
    console.log("this", this.$apis);
    this.compatible()
 
  },
  methods: {
    compatible() {
      if(/Android/.test(navigator.appVersion)) {
        window.addEventListener("resize", function() {
          if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
            document.activeElement.scrollIntoView({block: "end", inline: "nearest"});
          }
        })
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background-color: #f0f2f4;
}
/******reset********/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
}
body {
  font-family: Arial, "STHeiti", Helvetica, sans-serif;
  background: #efefef;
  font-size: 14px;
  color: #444 !important;
  width: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -webkit-overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
  line-height: 1.5;
}
body > * {
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
fieldset,
img {
  border: 0;
}
legend {
  display: none;
}
ol,
ul {
  list-style: none;
}
caption,
th {
  text-align: left;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}
q:before,
q:after {
  content: "";
}
abbr,
acronym {
  border: 0;
}
a {
  text-decoration: none;
}
html {
  -webkit-text-size-adjust: none;
  width: 100%;
  height: 100%;
} /*????iphone??safari????????????*/
input[type="text"],
input[type="button"],
input[type="submit"],
input[type="search"] {
  -webkit-appearance: none;
  border-radius: 0;
}
html,
body {
  height: 100%;
  width: auto;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
}
.bg {
  width: 100%;
  height: 100%;
}

.item {
  width: 68/7.5vw;
  height: 68/7.5vw;
  margin: 0 5/7.5vw 2/7.5vw 0;
  z-index: 10;
  box-sizing: border-box;
  position: relative;
}
.item img {
  width: 100%;
  height: 100%;
}
.item .lighted {
  position: absolute;
  width: 72/7.5vw;
  height: 72/7.5vw;
  top: -3/7.5vw;
  left: -1/7.5vw;
  z-index: 11;
}
.item.active {
  position: relative;
}
.column3 {
  margin-right: 23/7.5vw;
}
.column6 {
  margin-right: 23/7.5vw;
}
.mb {
  margin-bottom: 26/7.5vw;
}
.top {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 36/7.5vw;
  width: 100%;
  height: 70/7.5vw;
}
.top img {
  position: absolute;
  z-index: 2;
}
.back {
  width: 69/7.5vw;
  height: 71/7.5vw;
  left: 26/7.5vw;
}
.undo,
.restart {
  width: 207/7.5vw;
  height: 63/7.5vw;
  top: 5/7.5vw;
}
.undo {
  left: 116/7.5vw;
}
.restart {
  left: 116/7.5vw;
}
.top .base {
  width: 420/7.5vw;
  height: 70/7.5vw;
  z-index: 1;
  left: 112/7.5vw;
}
.logo {
  width: 151/7.5vw;
  height: 45/7.5vw;
  right: 38/7.5vw;
  top: 14/7.5vw;
}
.btnwrap {
  display: flex;
  flex-direction: row;
  margin-left: 12/7.5vw;
  position: absolute;
  bottom: 129/7.5vw;
  width: 105/7.5vw;
  height: 105/7.5vw;
}
.btnwrap img.btn {
  width: 105/7.5vw;
  height: 105/7.5vw;
  position: absolute;
  top: 0;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
</style>
