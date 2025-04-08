<template>
  <Prompt
    class="p10"
    :title="prompts.title"
    :color="prompts.color"
    :icon="prompts.icon"
    :list="prompts.list"
    :direction="'horizontal'"
    @itemClick="onItemClick($event)"
  ></Prompt>
  <Prompt
    class="p10"
    :title="prompts.title"
    :color="prompts.color"
    :icon="prompts.icon"
    :list="prompts.list"
    :direction="'vertical'"
    @itemClick="onItemClick($event)"
  ></Prompt>
  <Prompt
    class="p10"
    :title="promptsSub.title"
    :color="promptsSub.color"
    :icon="promptsSub.icon"
    :list="promptsSub.list"
    :direction="'horizontal'"
    @itemClick="onItemClick($event)"
  ></Prompt>
  <Prompt class="p10" :list="listText" :direction="'horizontal'" @itemClick="onItemClick($event)"></Prompt>
  <Prompt class="p10" :list="listIcon" :direction="'horizontal'" @itemClick="onItemClick($event)"></Prompt>
  <Prompt class="p10" :list="listDesc" :direction="'horizontal'" @itemClick="onItemClick($event)"></Prompt>
</template>

<script setup lang="ts">
import Prompt from '@matechat/core/Prompt/Prompt.vue';

const prompts = {
  title: 'Inspirational Sparks and Marvelous Tips',
  icon: 'like',
  color: 'rgb(24, 144, 255)',
  direction: 'horizontal',
  list: [
    {
      value: '1',
      label: 'Ignite Your Creativity',
      icon: 'icon-info-o',
      color: 'rgb(255, 215, 0)',
      desc: 'Got any sparks for a new project?',
    },
    {
      value: '2',
      label: 'Uncover Background Info',
      icon: 'icon-star',
      color: 'rgb(255, 215, 0)',
      desc: 'Help me understand the background of this topic.',
    },
  ],
};

const promptsSub = {
  title: 'Inspirational Sparks and Marvelous Tips',
  icon: 'like',
  color: 'rgb(24, 144, 255)',
  direction: 'horizontal',
  list: [
    {
      value: '1',
      label: 'Ignite Your Creativity',
      icon: 'icon-info-o',
      color: 'rgb(255, 215, 0)',
      subList: [
        {
          value: '1',
          label: 'Ignite Your Creativity',
          icon: 'icon-info-o',
          color: 'rgb(255, 215, 0)',
          desc: 'Got any sparks for a new project?',
        },
        {
          value: '2',
          label: 'Uncover Background Info',
          icon: 'icon-star',
          color: 'rgb(255, 215, 0)',
          desc: 'Help me understand the background of this topic.',
        },
      ],
    },
    {
      value: '2',
      label: 'Uncover Background Info',
      icon: 'icon-star',
      color: 'rgb(255, 215, 0)',
      subList: [
        {
          value: '1',
          label: 'Ignite Your Creativity',
          icon: 'icon-info-o',
          color: 'rgb(255, 215, 0)',
          desc: 'Got any sparks for a new project?',
        },
        {
          value: '2',
          label: 'Uncover Background Info',
          icon: 'icon-star',
          color: 'rgb(255, 215, 0)',
          desc: 'Help me understand the background of this topic.',
        },
      ],
    },
  ],
};

const listText = [
  {
    value: '1',
    label: 'Ignite Your Creativity',
  },
  {
    value: '2',
    label: 'Ignite Your XXX',
  },
];

const listIcon = [
  {
    value: '1',
    icon: 'icon-info-o',
    color: 'rgb(255, 215, 0)',
  },
  {
    value: '2',
    icon: 'icon-star',
    color: 'rgb(255, 215, 0)',
  },
];

const listDesc = [
  {
    value: '1',
    desc: 'icon-info-o',
  },
  {
    value: '2',
    desc: 'icon-star',
  },
];

function onItemClick(item) {
  console.log(item);
}
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.p10 {
  padding: 10px;
}
</style>
