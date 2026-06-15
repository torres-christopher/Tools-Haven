import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const inflationCalculatorFaq: FaqItem[] = [
  {
    question: 'Co je inflace a jak ovlivňuje hodnotu peněz?',
    answer:
      'Inflace je obecný růst cenové hladiny zboží a služeb v čase. Čím vyšší inflace, tím méně toho lze za stejnou částku koupit. Kalkulačka vám ukáže, jak se reálná kupní síla vaší částky změnila v průběhu let.',
  },
  {
    question: 'Z jakých dat reálná inflační kalkulačka vychází?',
    answer:
      'Kalkulačka využívá data {link}, konkrétně bazické indexy spotřebitelských cen se základnou v průměru roku 2025. Data pokrývají období od ledna 1997 do současnosti. Hodnoty před rokem 2015 jsou dopočítány zpětným řetězením z meziročních indexů.',
    link: {
      text: 'Českého statistického úřadu (ČSÚ)',
      url: 'https://csu.gov.cz/mira_inflace',
    },
  },
  {
    question: 'Jaký je rozdíl mezi měsíčními daty a průměrem roku?',
    answer:
      'Měsíční data zachycují cenovou hladinu v konkrétním měsíci a jsou vhodná pro přesné srovnání dvou konkrétních okamžiků. Průměr roku vychází z průměru všech dvanácti měsíců a lépe vystihuje celkovou cenovou úroveň daného roku bez vlivu sezónních výkyvů.',
  },
  {
    question: 'Proč nemohu kombinovat měsíční data s průměrem roku?',
    answer:
      'Měsíční index a roční průměr jsou různé veličiny ze dvou odlišných datových řad. Jejich kombinace by vedla k metodicky nesprávnému výsledku. Zvolte vždy buď konkrétní měsíce pro oba termíny, nebo průměr roku pro oba termíny.',
  },
  {
    question: 'Co znamenají výpočty vlastní sazby dopředu a zpětně?',
    answer:
      'Výpočet dopředu odpovídá na otázku: kolik bude mít částka hodnotu za N let při dané průměrné roční inflaci? Výpočet zpětně odpovídá na otázku: jakou hodnotu měla dnešní částka před N lety při dané průměrné roční inflaci?',
  },
  {
    question: 'Co je CAGR a k čemu slouží?',
    answer:
      'CAGR (Compound Annual Growth Rate, průměrný roční výnos) udává, jakým stálým ročním tempem by musela hodnota růst, aby se z počáteční částky dostala na konečnou částku za daný počet let. Hodí se například pro odhad ročního zhodnocení nemovitosti, investice nebo úspor.',
  },
  {
    question: 'Jak se CAGR liší od jednoduchého průměru?',
    answer:
      'Jednoduchý průměr rozpočítá celkový nárůst rovnoměrně na každý rok. CAGR naopak zohledňuje, že hodnota roste složeně, tedy že zisk z předchozích let se podílí na růstu v letech následujících. CAGR je proto standardní metoda pro hodnocení dlouhodobého zhodnocení.',
  },
  {
    question: 'Jak přesné jsou výsledky kalkulačky?',
    answer:
      'Výsledky jsou orientační. Reálná inflace se liší podle struktury výdajů každé domácnosti. ČSÚ sleduje průměrný spotřební koš, který nemusí odpovídat vaší osobní situaci. Kalkulačka slouží pro rychlý přehled, nikoliv jako podklad pro finanční rozhodnutí.',
  },
  {
    question: 'Ukládají se zadané hodnoty někam?',
    answer:
      'Ne. Všechny výpočty probíhají na serveru pouze pro účely zobrazení výsledku. Zadané hodnoty se nikam neukládají a nejsou sdíleny s třetími stranami.',
  },
  aiTransparencyFaq,
]
