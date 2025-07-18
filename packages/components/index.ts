import { McBubble } from './Bubble';
import { McHeader } from './Header';
import { McInput } from './Input';
import { McIntroduction } from './Introduction';
import { McLayoutAside, McLayoutContent, McLayoutHeader, McLayout, McLayoutSender } from './Layout';
import { McList } from './List';
import { useMcI18n, McLocale } from './Locale';
import { McMarkdownCard } from './MarkdownCard';
import { McMention } from './Mention';
import { McPrompt } from './Prompt';
import { McAttachment } from './Attachment'; 
import { McFileList } from './FileList';

const installs = [
  McBubble,
  McHeader,
  McInput,
  McIntroduction,
  McLayout,
  McList,
  McLocale,
  McMarkdownCard,
  McMention,
  McPrompt,
  McAttachment,
  McFileList,
];

export {
  McBubble,
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
  McAttachment,
  McFileList
};

export default {
  install(app) {
    installs.forEach((p) => app.use(p));
  }
};
