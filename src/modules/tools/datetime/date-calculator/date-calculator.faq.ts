import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const dateCalculatorFaq: FaqItem[] = [
  {
    question: 'Jak kalkulátor počítá rozdíl mezi daty v měsících?',
    answer:
      'Kalkulátor počítá celé kalendářní měsíce mezi dvěma daty. Pokud výchozí den v cílovém měsíci neexistuje, výsledek se zaokrouhlí na poslední den daného měsíce. Například od 31. ledna do 1. března je výsledek 1 měsíc a 1 den, protože jeden celý měsíc skončí 28. února a zbývající 1 den dovede výsledek na 1. března.',
  },
  {
    question: 'Co je ISO týden a proč se liší od kalendářního roku?',
    answer:
      'ISO týden je mezinárodní standard (ISO 8601), podle kterého týden vždy začíná pondělím a první týden roku je ten, který obsahuje první čtvrtek daného roku. Díky tomu se může stát, že několik posledních dní prosince patří do týdne 1 následujícího roku, nebo naopak první dny ledna do posledního týdne roku předchozího. Kalkulátor zobrazuje správné číslo týdne i příslušný ISO rok, aby nedocházelo k záměně.',
  },
  {
    question: 'Záleží na pořadí zadání dat při výpočtu rozdílu?',
    answer:
      'Ne. Kalkulátor vždy počítá absolutní rozdíl bez ohledu na to, které datum zadáte jako první. Výsledek bude stejný, ať už zadáte dřívější datum jako výchozí, nebo jako koncové.',
  },
  {
    question: 'Jak funguje přičítání a odečítání měsíců a let?',
    answer:
      'Měsíce a roky se přičítají nebo odečítají kalendářně, nikoliv jako pevný počet dní. Například přičtení 1 měsíce k 31. lednu dá 28. února (nebo 29. února v přestupném roce), nikoli 3. března. Tím je zajištěno, že výsledek vždy odpovídá skutečnému kalendářnímu datu.',
  },
  {
    question: 'Kolik týdnů má rok?',
    answer:
      'Rok má běžně 52 ISO týdnů. Některé roky mají 53 týdnů, pokud 1. ledna připadne na čtvrtek, nebo v přestupném roce, pokud 1. ledna připadne na středu nebo čtvrtek. Naposledy měl rok 53 týdnů rok 2020, příště to nastane v roce 2026.',
  },
  {
    question: 'Ukládají se zadané hodnoty někam?',
    answer:
      'Ne. Všechny výpočty probíhají na serveru pouze pro účely zobrazení výsledku. Zadané hodnoty se nikam neukládají a nejsou sdíleny s třetími stranami.',
  },
  aiTransparencyFaq,
]
