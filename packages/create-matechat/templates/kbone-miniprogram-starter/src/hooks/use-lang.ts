import { useLangStore } from '@/store';
import { LangType } from '@/types';

export function useLang() {
  const localLang = localStorage.getItem('matechat-lang') as LangType | null;
  const langStore = useLangStore();

  langStore.updateCurrentLang(localLang || LangType.CN);
}
