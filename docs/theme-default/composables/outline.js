import { onMounted, onUnmounted, onUpdated } from 'vue';
import { throttleAndDebounce } from '../support/utils';
// cached list of anchor elements from resolveHeaders
const resolvedHeaders = [];
export function resolveTitle(theme) {
  return (
    (typeof theme.outline === 'object' && !Array.isArray(theme.outline) && theme.outline.label) ||
    theme.outlineTitle ||
    ''
  );
}
export function getHeaders(range) {
  const headers = [...document.querySelectorAll('.vp-doc :where(h1,h2,h3,h4,h5,h6)')]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1]);
      return {
        element: el,
        title: serializeHeader(el),
        link: el.id,
        level,
      };
    });
  return resolveHeaders(headers, range);
}
function serializeHeader(h) {
  let ret = '';
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (
        node.classList.contains('VPBadge') ||
        node.classList.contains('header-anchor') ||
        node.classList.contains('ignore-header')
      ) {
        continue;
      }
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
export function resolveHeaders(headers, range) {
  if (range === false) {
    return [];
  }
  const levelsRange =
    (typeof range === 'object' && !Array.isArray(range) ? range.level : range) || 2;
  const [high, low] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange;
  return buildTree(headers, high, low);
}
export function useActiveAnchor(container) {
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener('scroll', onScroll);
  });
  onUpdated(() => {
    // sidebar update means a route change
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
  function setActiveLink() {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    const headers = resolvedHeaders
      .map(({ element, link }) => ({
        link,
        top: getAbsoluteTop(element),
      }))
      .filter(({ top }) => !Number.isNaN(top))
      .sort((a, b) => a.top - b.top);
    // no headers available for active link
    if (!headers.length) {
      activateLink(null);
      return;
    }
    // page top
    if (scrollY < 1) {
      activateLink(null);
      return;
    }
    // page bottom - highlight last link
    if (isBottom) {
      activateLink(headers[headers.length - 1].link);
      return;
    }
    // find the last header above the top of viewport
    let activeLink = null;
    for (const { link, top } of headers) {
      if (top > scrollY + getScrollYNum()) {
        break;
      }
      activeLink = link;
    }
    activateLink(activeLink);
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove('active');
    }
    if (hash == null) {
      prevActiveLink = null;
    } else {
      prevActiveLink = container.value.querySelector(`.content-nav #nav-${hash}`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}
export function setHtmlScrollPaddingTopClass() {
  const isComponentsPage = location.pathname.startsWith('/components/introduction/demo');
  if (isComponentsPage) {
    document.documentElement.classList.add('html-scroll-padding-top');
  } else {
    document.documentElement.classList.remove('html-scroll-padding-top');
  }
}
function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      // child element is:
      // - not attached to the DOM (display: none)
      // - set to fixed position (not scrollable)
      // - body or html element (null offsetParent)
      return NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
function buildTree(data, min, max) {
  resolvedHeaders.length = 0;
  const result = [];
  const stack = [];
  data.forEach((item) => {
    const node = { ...item, children: [] };
    let parent = stack[stack.length - 1];
    while (parent && parent.level >= node.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }
    if (node.element.classList.contains('ignore-header') || (parent && 'shouldIgnore' in parent)) {
      stack.push({ level: node.level, shouldIgnore: true });
      return;
    }
    if (node.level > max || node.level < min) return;
    resolvedHeaders.push({ element: node.element, link: node.link });
    if (parent) parent.children.push(node);
    else result.push(node);
    stack.push(node);
  });
  return result;
}
function getScrollYNum() {
  const isComponentsPage = location.pathname.startsWith('/components/introduction/demo');
  return isComponentsPage ? 110 : 60;
}
