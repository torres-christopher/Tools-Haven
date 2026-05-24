import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const bmiFaq: FaqItem[] = [
  {
    question: 'Co je BMI?',
    answer:
      'BMI (Body Mass Index) je jednoduchý ukazatel poměru tělesné hmotnosti a výšky. Vypočítá se jako váha v kilogramech dělená druhou mocninou výšky v metrech. Výsledek slouží jako orientační měřítko toho, zda má člověk podváhu, normální váhu, nadváhu nebo obezitu.',
  },
  {
    question: 'Jak se BMI počítá?',
    answer:
      'Vzorec pro výpočet BMI je: BMI = váha (kg) / výška² (m). Například člověk vážící 75 kg s výškou 175 cm má BMI = 75 / (1,75 × 1,75) = 24,5.',
  },
  {
    question: 'Jaké jsou kategorie BMI pro dospělé?',
    answer:
      'Světová zdravotnická organizace (WHO) definuje čtyři základní kategorie: Podváha (BMI pod 18,5), Normální váha (18,5–24,9), Nadváha (25–29,9) a Obezita (30 a více). Obezita se dále dělí na tři stupně: I. stupeň (30–34,9), II. stupeň (35–39,9) a III. stupeň (40 a více).',
  },
  {
    question: 'Je BMI přesný ukazatel zdraví?',
    answer:
      'BMI je užitečný orientační ukazatel, ale má svá omezení. Nebere v úvahu rozložení tukové tkáně, svalovou hmotu ani věk. Sportovci s vysokou svalovou hmotou mohou mít vysoké BMI přesto, že jsou zdraví. Starší lidé naopak mohou mít normální BMI i při nadbytku tuku. Pro přesnější posouzení zdravotního stavu se poraďte s lékařem.',
  },
  {
    question: 'Pro koho je kalkulačka určena?',
    answer:
      'Tato kalkulačka je určena pro dospělé ve věku 20 let a více. Pro děti a dospívající (2–19 let) se BMI hodnotí jinak, porovnává se s růstovými grafy podle věku a pohlaví.',
  },
  {
    question: 'Jaká jsou zdravotní rizika nadváhy?',
    answer:
      'Nadváha a obezita zvyšují riziko řady závažných onemocnění, včetně vysokého krevního tlaku, cukrovky 2. typu, onemocnění srdce a cév, některých druhů rakoviny, spánkové apnoe a onemocnění kloubů. Snížení BMI i o několik jednotek může výrazně snížit tato rizika.',
  },
  {
    question: 'Jaká jsou zdravotní rizika podváhy?',
    answer:
      'Podváha může vést k nedostatku vitamínů a minerálů, oslabení imunitního systému, řídnutí kostí (osteoporóze) a u žen k poruchám menstruačního cyklu. Pokud máte podváhu, doporučujeme konzultaci s lékařem nebo nutričním specialistou.',
  },
  {
    question: 'Jsou moje data v bezpečí?',
    answer:
      'Zadané hodnoty se nikam neukládají ani neodesílají třetím stranám. Výpočet probíhá na serveru výhradně pro zobrazení výsledku a data jsou po zpracování okamžitě zahozena.',
  },
  aiTransparencyFaq,
]
