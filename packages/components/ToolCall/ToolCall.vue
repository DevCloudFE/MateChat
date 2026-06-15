<template>
  <div
    class="tool-card"
    :class="[
      `tool-card--${variant}`,
      `tool-card--${status}`,
      {
        'tool-card--expanded': isExpanded,
        'tool-card--blink': shouldBlink,
        'tool-card--collapsible': collapsible,
      },
    ]"
  >
    <!-- Header 区域 -->
    <div
      class="tool-card__header"
      :class="{ 'tool-card__header--clickable': collapsible }"
      role="button"
      :tabindex="collapsible ? 0 : -1"
      :aria-expanded="collapsible ? isExpanded : undefined"
      @click="handleHeaderClick"
      @keydown.enter="handleHeaderClick"
      @keydown.space.prevent="handleHeaderClick"
    >
      <!-- 图标区域 -->
      <div class="tool-card__icon" :class="{ 'tool-card__icon--blink': shouldBlink }">
        <slot name="icon">
          <template v-if="icon">
            <component
              v-if="isComponent(icon)"
              :is="icon"
              class="tool-card__icon-component"
            />
            <span v-else class="tool-card__icon-text" v-html="icon" />
          </template>
          <span v-else-if="builtinIconSvg" class="tool-card__icon-builtin" v-html="builtinIconSvg" />
          <span v-else class="tool-card__icon-default">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
            </svg>
          </span>
        </slot>
      </div>

      <!-- 名称与描述 -->
      <div class="tool-card__info">
        <div class="tool-card__name-row">
          <slot name="name" :name="name">
            <span class="tool-card__name">{{ name }}</span>
          </slot>
          <span
            class="tool-card__status-dot"
            :class="{ 'tool-card__status-dot--blink': shouldBlink }"
            :title="statusLabel"
          />
        </div>
        <slot name="description" :description="description">
          <span v-if="description" class="tool-card__description">{{ description }}</span>
        </slot>
      </div>

      <!-- 头部操作区 -->
      <div v-if="hasHeaderAction" class="tool-card__header-action" @click.stop>
        <slot name="header-action" :status="status" />
      </div>

      <!-- 折叠箭头 -->
      <button
        v-if="collapsible"
        class="tool-card__collapse-btn"
        :class="{ 'tool-card__collapse-btn--rotated': isExpanded }"
        :aria-label="isExpanded ? '收起' : '展开'"
        @click.stop="toggleExpand"
      >
        <svg
          class="tool-card__collapse-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>

    <!-- Running 提示浮层 -->
    <Transition name="hint-fade">
      <div v-if="showRunningHint" class="tool-card__running-hint-banner">
        <span class="tool-card__running-hint-icon">⏳</span>
        正在努力执行中...
      </div>
    </Transition>

    <!-- 内容区域 -->
    <Transition name="collapse">
      <div v-show="isExpanded" class="tool-card__content">
        <div class="tool-card__content-inner">
          <!-- 参数区域 -->
          <div v-if="hasParamsSlot || params != null" class="tool-card__section">
            <slot name="params-content" :params="params">
              <div v-if="params != null" class="tool-card__params-default">
                <span class="tool-card__section-label">参数</span>
                <pre class="tool-card__code">{{ formatData(params) }}</pre>
              </div>
            </slot>
          </div>

          <!-- 结果区域 -->
          <div v-if="hasResultSlot || result != null" class="tool-card__section">
            <slot name="result-content" :result="result">
              <div v-if="result != null" class="tool-card__result-default">
                <span class="tool-card__section-label">结果</span>
                <pre class="tool-card__code">{{ formatData(result) }}</pre>
              </div>
            </slot>
          </div>

          <!-- 默认插槽 -->
          <div v-if="hasDefaultSlot" class="tool-card__section">
            <slot />
          </div>

          <!-- 错误重试 -->
          <div v-if="status === 'error'" class="tool-card__retry-section">
            <button class="tool-card__retry-btn" @click.stop="handleRetry">
              <svg
                class="tool-card__retry-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <polyline points="1 4 1 10 7 10" />
                <path d="M4 17A9 9 0 1 0 3 10" />
              </svg>
              重试
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { type Component, computed, ref, useSlots, watch } from 'vue';

type ToolStatus = 'pending' | 'success' | 'error' | 'running';
type CardVariant = 'default' | 'compact' | 'bordered';

const props = withDefaults(
  defineProps<{
    name: string;
    description?: string;
    icon?: string | Component;
    status?: ToolStatus;
    collapsible?: boolean;
    defaultExpanded?: boolean;
    blink?: boolean;
    variant?: CardVariant;
    result?: any;
    params?: any;
    allowExpandWhenRunning?: boolean;
  }>(),
  {
    status: 'pending',
    collapsible: true,
    defaultExpanded: false,
    blink: true,
    variant: 'default',
    allowExpandWhenRunning: false,
  },
);

const emit = defineEmits<{
  'expand-change': [expanded: boolean];
  retry: [];
}>();

const slots = useSlots();
const hasHeaderAction = computed(() => !!slots['header-action']);
const hasParamsSlot = computed(() => !!slots['params-content']);
const hasResultSlot = computed(() => !!slots['result-content']);
const hasDefaultSlot = computed(() => !!slots.default);

const isExpanded = ref(props.defaultExpanded);
const showRunningHint = ref(false);
let runningHintTimer: ReturnType<typeof setTimeout> | null = null;

const shouldBlink = computed(() => props.blink && props.status === 'running');

const statusLabel = computed(() => {
  const labels: Record<ToolStatus, string> = {
    pending: '等待中',
    running: '执行中',
    success: '已完成',
    error: '执行失败',
  };
  return labels[props.status];
});

function isComponent(value: string | Component): value is Component {
  return typeof value !== 'string' && value !== null;
}

const builtinIconSvg = computed(() => {
  if (props.icon) return null;
  return getBuiltinIcon(props.name);
});

function getBuiltinIcon(name: string): string | null {
  const lowerName = name.toLowerCase();
  const fileTools = [
    'read',
    'write',
    'edit',
    'glob',
    'grep',
    'ls',
    'cat',
    'cp',
    'mv',
    'rm',
    'touch',
    'mkdir',
  ];
  if (fileTools.includes(lowerName)) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`;
  }
  const execTools = ['bash', 'task', 'shell', 'exec', 'run', 'cmd', 'terminal'];
  if (execTools.includes(lowerName)) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>`;
  }
  const cognitiveTools = [
    'question',
    'webfetch',
    'websearch',
    'search',
    'ask',
    'query',
    'lookup',
  ];
  if (cognitiveTools.includes(lowerName)) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <circle cx="11" cy="11" r="3" fill="currentColor" opacity="0.15"/>
    </svg>`;
  }
  const mgmtTools = [
    'todolist',
    'todoread',
    'skill',
    'plan',
    'todo',
    'checklist',
    'agenda',
  ];
  if (mgmtTools.includes(lowerName)) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <polyline points="9 12 11 14 15 10"/>
      <line x1="9" y1="5" x2="9" y2="19"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
    <path d="M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/>
  </svg>`;
}

function toggleExpand() {
  if (!props.collapsible) return;
  if (
    props.status === 'running' &&
    !props.allowExpandWhenRunning &&
    !isExpanded.value
  ) {
    triggerRunningHint();
    return;
  }
  isExpanded.value = !isExpanded.value;
  emit('expand-change', isExpanded.value);
}

function handleHeaderClick() {
  if (!props.collapsible) return;
  if (
    props.status === 'running' &&
    !props.allowExpandWhenRunning &&
    !isExpanded.value
  ) {
    triggerRunningHint();
    return;
  }
  isExpanded.value = !isExpanded.value;
  emit('expand-change', isExpanded.value);
}

function triggerRunningHint() {
  showRunningHint.value = true;
  if (runningHintTimer) clearTimeout(runningHintTimer);
  runningHintTimer = setTimeout(() => {
    showRunningHint.value = false;
  }, 2500);
}

function handleRetry() {
  emit('retry');
}

function formatData(data: any): string {
  if (data === null || data === undefined) return '';
  if (typeof data === 'string') return data;
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

watch(
  () => props.status,
  (newStatus) => {
    if (newStatus === 'error' && props.collapsible) {
      isExpanded.value = true;
      emit('expand-change', true);
    }
    if (newStatus !== 'running') {
      showRunningHint.value = false;
      if (runningHintTimer) {
        clearTimeout(runningHintTimer);
        runningHintTimer = null;
      }
    }
  },
);

watch(
  () => props.collapsible,
  (val) => {
    if (!val) {
      isExpanded.value = true;
    }
  },
);
</script>

<style scoped>
/* ---------- 简化版样式：仅保留基础布局与内容区展开收起动画 ---------- */

/* 卡片容器 */
.tool-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  font-family: inherit;
}

/* 头部 */
.tool-card__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  user-select: none;
}
.tool-card__header--clickable {
  cursor: pointer;
}
.tool-card__header--clickable:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* 图标 */
.tool-card__icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 名称与描述 */
.tool-card__info {
  flex: 1;
  min-width: 0;
}
.tool-card__name {
  font-weight: 600;
}
.tool-card__description {
  font-size: 0.85em;
  color: #888;
}

/* 状态指示点（仅保留占位） */
.tool-card__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #bbb;
  flex-shrink: 0;
}

/* 头部操作区 */
.tool-card__header-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 折叠按钮 */
.tool-card__collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}
.tool-card__collapse-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}
.tool-card__collapse-btn--rotated .tool-card__collapse-arrow {
  transform: rotate(180deg);
}

/* Running 提示浮层（无动画） */
.tool-card__running-hint-banner {
  margin: 0 16px;
  padding: 8px 12px;
  font-size: 0.85em;
  color: #555;
  background: #f5f5f5;
  border-left: 3px solid #3b82f6;
}

/* 内容区 */
.tool-card__content {
  overflow: hidden;
}
.tool-card__content-inner {
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 参数/结果标签 */
.tool-card__section-label {
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #999;
}
.tool-card__code {
  margin: 0;
  padding: 10px 12px;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85em;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 320px;
  overflow-y: auto;
}

/* 重试按钮 */
.tool-card__retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  font-size: 14px;
  color: #fff;
  background: #ef4444;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* ---------- 仅保留的内容区展开/收起动画 ---------- */
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 800px;
  opacity: 1;
}
</style>
