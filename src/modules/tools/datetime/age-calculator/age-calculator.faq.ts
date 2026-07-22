import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const ageCalculatorFaq: FaqItem[] = [
  {
    question: 'Co kalkulačka věku počítá?',
    answer:
      'Kalkulačka zjistí přesný věk v letech, měsících a dnech od zadaného data narození do dneška. Zároveň zobrazí, za kolik dní budou příští narozeniny a na jaký den v týdnu připadnou. V sekci informací o datu narození najdete den v týdnu, číslo týdne a pořadový den v roce.',
  },
  {
    question: 'Jak se věk v letech, měsících a dnech počítá?',
    answer:
      'Kalkulačka nejprve zjistí počet celých let od data narození do dneška. Pak od mezidatumu odpočítá zbývající celé měsíce a nakonec zbývající dny. Výsledek tak přesně odpovídá tomu, jak věk vnímáme v běžném životě. Nestačí jen odečíst rok narození od aktuálního roku, protože záleží na tom, zda narozeniny v daném roce již proběhly nebo ještě proběhnout mají.',
  },
  {
    question: 'Jak se počítají příští narozeniny?',
    answer:
      'Kalkulačka vezme datum narození, přesune ho do aktuálního roku a zkontroluje, zda narozeniny již proběhly. Pokud ano, použije příští rok. Výsledkem je počet dní do příštích narozenin a den v týdnu, na který připadnou. Pokud jsou narozeniny právě dnes, zobrazí se 365 dní do těch příštích.',
  },
  {
    question: 'Jak kalkulačka pracuje s 29. únorem?',
    answer:
      'V rocích, která nejsou přestupná, neexistuje 29. únor. Kalkulačka v takovém případě použije 1. března jako datum příštích narozenin. Tato konvence je nejrozšířenější a používá se například při právním určení věku.',
  },
  {
    question: 'Co je pořadový den v roce a číslo týdne?',
    answer:
      'Pořadový den v roce udává, kolikátý den od 1. ledna daný den je. Rok má 365 dní, přestupný rok 366. Číslo týdne vychází z mezinárodního standardu {link}, podle kterého týden začíná pondělím a první týden roku je ten, který obsahuje první čtvrtek daného roku.',
    link: {
      text: 'ISO 8601',
      url: 'https://www.iso.org/iso-8601-date-and-time-format.html',
    },
  },
  {
    question: 'Ukládají se zadané hodnoty někam?',
    answer:
      'Ne. Výpočet probíhá na serveru pouze pro zobrazení výsledku. Zadané datum se nikam neukládá a není sdíleno s třetími stranami.',
  },
  aiTransparencyFaq,
]
