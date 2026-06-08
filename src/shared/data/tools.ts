import { type ToolsDetails } from '../types/toolDetails.js'

export const tools: ToolsDetails[] = [
  {
    id: 'pocet-znaku',
    title: {
      cs: 'Počet znaků',
      sk: 'Počet znakov',
    },
    description: {
      cs: 'Spočítejte počet znaků, slov, vět, řádků a normostran v textu. Zdarma, bez registrace.',
      sk: 'Spočítajte počet znakov, slov, viet, riadkov a normostráň v texte. Zadarmo, bez registrácie.',
    },
    slug: {
      cs: 'pocet-znaku',
      sk: 'pocet-znakov',
    },
    categoryName: {
      cs: 'Textové nástroje',
      sk: 'Textové nástroje',
    },
    categoryPath: '/text',
    icon: '✏️',
    enabled: {
      cs: true,
      sk: false,
    },
    featured: 1,
  },
  {
    id: 'prevod-velikosti-znaku',
    title: {
      cs: 'Převod velikosti znaků',
      sk: 'Prevod veľkosti znakov',
    },
    description: {
      cs: 'Převeďte text na velká, malá, titulková nebo větná písmena. Podporuje češtinu, azbuku i arabštinu.',
      sk: 'Preveďte text na veľké, malé, titulkové alebo vetné písmená. Podporuje slovenčinu, azbuku aj arabčinu.',
    },
    slug: {
      cs: 'prevod-velikosti-znaku',
      sk: 'prevod-velkosti-znakov',
    },
    categoryName: {
      cs: 'Textové nástroje',
      sk: 'Textové nástroje',
    },
    categoryPath: '/text',
    icon: '🔡',
    enabled: {
      cs: true,
      sk: false,
    },
    featured: 2,
  },
  {
    id: 'json-validator',
    title: {
      cs: 'Formátování a validace JSONu',
      sk: 'Formátovanie a validácia JSONu',
    },
    description: {
      cs: 'Validujte, formátujte a minifikujte JSON text.',
      sk: 'Validujte, formátujte a minifikujte JSON text.',
    },
    slug: {
      cs: 'json-validator',
      sk: 'json-validator',
    },
    categoryName: {
      cs: 'Vývojářské nástroje',
      sk: 'Vývojárske nástroje',
    },
    categoryPath: '/developer',
    icon: '📋',
    enabled: {
      cs: true,
      sk: false,
    },
    featured: 1,
  },
  {
    id: 'bmi-kalkulacka',
    title: {
      cs: 'BMI kalkulačka',
      sk: 'BMI kalkulačka',
    },
    description: {
      cs: 'Spočítejte si BMI (Body Mass Index) podle své výšky a hmotnosti.',
      sk: 'Vypočítajte si BMI (Body Mass Index) podľa svojej výšky a hmotnosti.',
    },
    slug: {
      cs: 'bmi-kalkulacka',
      sk: 'bmi-kalkulacka',
    },
    categoryName: {
      cs: 'Zdravotní nástroje',
      sk: 'Zdravotné nástroje',
    },
    categoryPath: '/health',
    icon: '⚖️',
    enabled: {
      cs: true,
      sk: false,
    },
    featured: 1,
  },
  {
    id: 'inflacni-kalkulacka',
    title: {
      cs: 'Inflační kalkulačka',
      sk: 'Inflačná kalkulačka',
    },
    description: {
      cs: 'Spočítejte, jak inflace ovlivnila hodnotu peněz v čase. Reálná česká inflace nebo vlastní sazba.',
      sk: 'Vypočítajte, ako inflácia ovplyvnila hodnotu peňazí v čase. Reálna česká inflácia alebo vlastná sadzba.',
    },
    slug: {
      cs: 'inflacni-kalkulacka',
      sk: 'inflacna-kalkulacka',
    },
    categoryName: {
      cs: 'Lokální data',
      sk: 'Lokálne dáta',
    },
    categoryPath: '/data',
    icon: '📈',
    enabled: {
      cs: true,
      sk: false,
    },
    featured: 1,
  },
]
