import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const jsonValidatorFaq: FaqItem[] = [
  {
    question: 'Co je to JSON?',
    answer:
      'JSON (JavaScript Object Notation) je formát pro strukturovanou úchovu dat. Je čitelný  pro lidi i stroje a používá se pro přenos dat mezi aplikacemi, v konfiguračních souborech nebo jako formát API odpovědí.',
  },
  {
    question: 'Co znamená validace JSONu?',
    answer:
      'Validace zkontroluje, zda je váš JSON syntakticky správný, čili zda dodržuje pravidla formátu JSON {link}. Pokud je neplatný, nástroj zobrazí chybovou zprávu s číslem řádku a sloupce, kde chyba nastala.',
    link: {
      text: 'RFC8259',
      url: 'https://datatracker.ietf.org/doc/html/rfc8259',
    },
  },
  {
    question: 'Jaký je rozdíl mezi formátováním a minifikací?',
    answer:
      'Formátování (neboli "beautify") odebírá nepotřebné mezery a naopak přidá odsazení a zalomení řádků, aby byl JSON přehledný a čitelný. Minifikace naopak odstraní všechny mezery a zalomení, čímž zmenší velikost souboru, což se hodí například pro přenos dat po síti.',
  },
  {
    question: 'Co je odsazení a jak ho nastavit?',
    answer:
      'Odsazení určuje, jak hluboko budou vnořené bloky JSONu odsazeny při formátování. Můžete zvolit počet mezer (1–10) nebo tabulátor. Nejčastěji se používají 2 nebo 4 mezery.',
  },
  {
    question: 'Proč se zobrazuje chyba „Unexpected end of JSON input"?',
    answer:
      'Tato chyba znamená, že JSON je neúplný, například chybí uzavírací závorka, složená závorka nebo uvozovka. Zkontrolujte, zda jsou všechny otevřené závorky správně uzavřeny.',
  },
  {
    question: "Co znamená chyba „Expected property name or '}'\"?",
    answer:
      'Tato chyba obvykle znamená, že JSON obsahuje přebytečnou čárku za posledním prvkem objektu nebo pole, nebo že chybí název vlastnosti. JSON na rozdíl od JavaScriptu nepodporuje trailing čárky.',
  },
  {
    question: 'Jsou platným JSONem i hodnoty jako null, true nebo čísla?',
    answer:
      'Ano. Platný JSON nemusí být vždy objekt nebo pole. Hodnotami null, true, false, čísla i řetězce jsou podle specifikace JSON platné kořenové hodnoty.',
  },
  {
    question: 'Podporuje nástroj češtinu a jiné jazyky?',
    answer:
      'Ano. Nástroj plně podporuje Unicode znaky, tudíž češtinu, diakritiku, azbuku, arabštinu, čínštinu i emoji. Speciální znaky v hodnotách JSON jsou zpracovány správně.',
  },
  {
    question: 'Jsou moje data v bezpečí?',
    answer:
      'Veškerý text zadaný do nástroje se nikam neukládá ani neodesílá třetím stranám. Zpracování probíhá na serveru výhradně pro účely validace a formátování, po nichž jsou data okamžitě zahozena.',
  },
  {
    question: 'Funguje nástroj i bez JavaScriptu?',
    answer:
      'Ano. Pokud je JavaScript vypnutý, nástroj funguje přes standardní odeslání formuláře. Zvýraznění syntaxe a živá validace jsou dostupné pouze s JavaScriptem.',
  },
  aiTransparencyFaq,
]
