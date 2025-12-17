import { McAttachment } from './Attachment';
import { McBubble } from './Bubble';
import { McFileList } from './FileList';
import { McHeader } from './Header';
import { McInput } from './Input';
import { McIntroduction } from './Introduction';
import { McLayoutAside, McLayoutContent, McLayoutHeader, McLayout, McLayoutSender } from './Layout';
import { McList } from './List';
import { useMcI18n, McLocale } from './Locale';
import { McMarkdownCard } from './MarkdownCard';
import { McMention } from './Mention';
import { McPrompt } from './Prompt';
import { McToolbar, McCopyIcon, McDeleteIcon, McLikeIcon, McRefreshIcon, McShareIcon } from './Toolbar';

const installs = [
  McAttachment,
  McBubble,
  McFileList,
  McHeader,
  McInput,
  McIntroduction,
  McLayout,
  McList,
  McLocale,
  McMarkdownCard,
  McMention,
  McPrompt,
  McToolbar
];

export {
  McAttachment,
  McBubble,
  McFileList,
  McHeader,
  McInput,
  McIntroduction,
  McLayoutAside,
  McLayoutContent,
  McLayoutHeader,
  McLayout,
  McLayoutSender,
  McList,
  useMcI18n,
  McLocale,
  McMarkdownCard,
  McMention,
  McPrompt,
  McToolbar,
  McCopyIcon,
  McDeleteIcon,
  McLikeIcon,
  McRefreshIcon,
  McShareIcon
};

export default {
  install(app) {
    installs.forEach((p) => app.use(p));
  }
};
