<template>
  <div class="typical-container">
    <div class="title">典型组件展示</div>
    <div class="main">
      <div class="content">
        <div class="comp-card" v-for="(item, i) in list" :key="i" :class="item.class">
          <div class="img-container">
            <a v-localeHref="item.href">
              <img :data-src="item.img" src="/logo.svg" />
            </a>
          </div>
          <div class="bottom">
            <div class="label">{{ item.label }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
      <div class="typical-btn">
        <a v-localeHref="'/components/introduction/demo.html'">
          <div class="btn">
            <div class="btn-text">了解更多组件</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  {
    label: '消息气泡',
    desc: '用于承载对话内容的气泡组件',
    class: ['bubble-bg'],
    img: '/png/home/comp/bubbleComp.png',
    href: '/components/bubble/demo.html',
  },
  {
    label: '快捷使用',
    desc: '用于根据输入内容进行快捷提示的组件',
    class: ['mention-bg'],
    img: '/png/home/comp/mentionComp.png',
    href: '/components/mention/demo.html',
  },
  {
    label: '输入框',
    desc: '用于对话的输入框组件',
    class: ['input-bg'],
    img: '/png/home/comp/inputComp.png',
    href: '/components/input/demo.html',
  },
];
</script>

<style lang="scss" scoped>
@use 'devui-theme/styles-var/devui-var.scss' as *;
@use './common.scss';

.typical-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: no-repeat url(/png/home/comp/bg.svg);
  background-size: contain;
  background-position: right;
  // &::before {
  //   position: absolute;
  //   content: '';
  //   display: block;
  //   width: 100px;
  //   height: 100px;
  //   background: no-repeat center / cover url(/png/home/comp/sticker.png);
  // }
}
.content {
  width: 80%;
  margin: 80px 0 56px 0;
  margin-left: calc(5% - 2em);
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  .comp-card {
    width: 30%;
    aspect-ratio: 1 / 1.1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .img-container {
      width: 100%;
      height: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        width: 60%;
        max-height: 90%;
      }
      img {
        width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .bottom {
      width: 60%;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 10%;
      padding-bottom: 5%;
      .label {
        font-size: 28px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 8px;
      }
      .desc {
        font-size: 16px;
        color: $devui-aide-text;
      }
    }
  }
}
.bubble-bg {
  background: no-repeat center/cover url(/png/home/comp/bubbleBg.png);
  background-size: 100% 100%;
}
.mention-bg {
  background: no-repeat center/cover url(/png/home/comp/mentionBg.png);
  background-size: 100% 100%;
}
.input-bg {
  background: no-repeat center/cover url(/png/home/comp/inputBg.png);
  background-size: 100% 100%;
}
.typical-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 56px;
  .btn {
    width: 252px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    border-radius: 84px;
    background: no-repeat center/contain url(/png/home/comp/btnBg.svg);
    color: #db6fe5;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }

    .btn-text {
      background: linear-gradient(to right, #B369FF, #7B79FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

@media (max-width: 1600px) {
  .content {
    margin: 56px 0;
    margin-left: calc(10% - 4em);
    .comp-card .bottom {
      .label {
        font-size: 18px;
      }
      .desc {
        font-size: 11px;
      }
    }
  }
  .typical-btn .btn {
    width: 194px;
    height: 65px;
    line-height: 65px;
    border-radius: 65px;
    font-size: 25px;
  }
}
@media (max-width: 768px) {
  .content .comp-card {
    width: 45%;
    .bottom {
      .label {
        font-size: 12px;
        margin-bottom: 0;
      }
      .desc {
        display: none;
      }
    }
  }
  .typical-btn .btn {
    width: 126px;
    height: 42px;
    line-height: 42px;
    border-radius: 42px;
    font-size: 16px;
  }
}
</style>
