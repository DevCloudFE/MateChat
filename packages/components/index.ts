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
  McPrompt
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
  McPrompt
};

export default {
  install(app) {
    installs.forEach((p) => app.use(p));
  }
};
