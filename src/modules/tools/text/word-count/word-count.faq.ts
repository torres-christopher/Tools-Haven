import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const wordCountFaq: FaqItem[] = [
  {
    question: 'Co tento nástroj počítá?',
    answer:
      'Nástroj počítá celkový počet znaků, počet znaků bez mezer, počet slov, počet vět, počet řádků, počet normostran a orientační dobu čtení. Výsledky slouží jako rychlý praktický odhad pro běžné texty.',
  },
  {
    question: 'Jak dlouhý text mohu spočítat?',
    answer:
      'Nástroj zvládne texty až do délky 300 000 znaků, což odpovídá přibližně 166 normostranám.',
  },
  {
    question: 'Co znamená počet znaků celkem?',
    answer:
      'Počet znaků celkem je délka celého vloženého textu přesně tak, jak byl zadán. Započítávají se písmena, čísla, mezery, interpunkce i zalomení řádků. Vypočítává se jako běžná délka řetězce.',
  },
  {
    question: 'Co znamená počet znaků bez mezer?',
    answer:
      'Počet znaků bez mezer ukazuje délku textu po odebrání všech tzv. "whitespace" znaků. To znamená nejen klasických mezer, ale i tabulátorů a zalomení řádků. Výpočet probíhá odstraněním všech znaků odpovídajících \\s a následným spočítáním délky výsledku.',
  },
  {
    question: 'Jak se počítá počet slov?',
    answer:
      'Počet slov se určuje hledáním sekvencí písmen. Nástroj rozpoznává písmena všech světových abeced včetně češtiny, azbuky, arabštiny a asijských písem. Pokud text obsahuje jen mezery nebo neobsahuje žádná písmena, výsledek je 0. Čísla nebo samotná interpunkce se jako samostatná slova nezapočítávají.',
  },
  {
    question: 'Jak se počítá počet vět?',
    answer:
      'Počet vět je orientační odhad. Pokud text neobsahuje žádná skutečná slova, vrátí se 0. Jinak nástroj hledá hranice vět podle vzoru: delší slovo, za ním tečka, otazník nebo vykřičník, mezera a další věta začínající velkým písmenem. Počet nalezených hranic se navýší o 1 kvůli první větě. U neobvyklého zápisu, zkratek nebo textů bez správné interpunkce může být výsledek pouze přibližný (např. věta "Je pan Ing. Novák v práci?").',
  },
  {
    question: 'Co je normostrana a jak se počítá?',
    answer:
      'Normostrana je zde počítána jako 1800 znaků včetně mezer. Výpočet probíhá vydělením celkového počtu znaků číslem 1800. Výsledek proto může být desetinný, například 0.5 normostrany.',
  },
  {
    question: 'Jak se počítá počet řádků?',
    answer:
      'Počet řádků vychází z reálných zalomení v textu. Nejprve se oříznou prázdné znaky na začátku a na konci textu, potom se text rozdělí podle konců řádků typu \\n, \\r\\n nebo \\r. Pokud text obsahuje jen mezery nebo je prázdný, výsledek je 0.',
  },
  {
    question: 'Jak se počítá odhadovaná doba čtení?',
    answer:
      'Doba čtení je orientační a vychází z počtu slov. Nástroj počítá s rychlostí přibližně 200 slov za minutu. Výsledek se vždy zaokrouhluje nahoru na celé minuty, takže i kratší text může vyjít jako 1 minuta.',
  },
  {
    question: 'Jsou výsledky vždy úplně přesné?',
    answer:
      'Počet znaků a počet znaků bez mezer jsou velmi přesné podle zadaného textu. Počet slov, vět a doba čtení jsou praktické odhady založené na jednoduchých pravidlech. U textů se zkratkami, speciálními znaky, neobvyklým formátováním nebo bez interpunkce se může výsledek lišit od lidského posouzení.',
  },
  {
    question: 'Funguje nástroj i bez JavaScriptu?',
    answer:
      'Ano. Pokud máte v prohlížeči povolený JavaScript, může nástroj fungovat i jako živá kalkulačka s okamžitým přepočtem při psaní. Pokud JavaScript povolený není, nástroj bude stále fungovat přes klasické odeslání formuláře metodou POST po načtení stránky.',
  },
  aiTransparencyFaq,
]
