import { type ToolsDetails } from '../types/toolDetails.js'

export const tools: ToolsDetails[] = [
  {
    title: 'Počet znaků',
    description:
      'Spočítejte počet znaků, slov, vět, řádků a normostran v textu. Zdarma, bez registrace.',
    path: '/textove-nastroje/pocet-znaku',
    slug: 'pocet-znaku',
    icon: '✏️',
    categoryName: 'Textové nástroje',
    categoryPath: '/textove-nastroje',
    enabled: true,
    featured: 1,
  },
  {
    title: 'Převod velikosti znaků',
    description:
      'Převeďte text na velká, malá, titulková nebo větná písmena. Podporuje češtinu, azbuku i arabštinu.',
    path: '/textove-nastroje/prevod-velikosti-znaku',
    slug: 'prevod-velikosti-znaku',
    icon: '🔡',
    categoryName: 'Textové nástroje',
    categoryPath: '/textove-nastroje',
    enabled: true,
    featured: 2,
  },
  {
    title: 'Formátování a validace JSONu',
    description:
      'Validujte, formátujte a minifikujte JSON text. Podporuje češtinu, azbuku i arabštinu.',
    path: '/vyvojarske-nastroje/json-validator',
    slug: 'json-validator',
    icon: '📋',
    categoryName: 'Vývojářské nástroje',
    categoryPath: '/vyvojarske-nastroje',
    enabled: true,
    featured: 1,
  },
  {
    title: 'Inflační kalkulačka',
    description:
      'Spočítejte, jak inflace ovlivnila hodnotu peněz v čase. Reálná česká inflace nebo vlastní sazba.',
    path: '/ceske-nastroje/inflacni-kalkulator',
    slug: 'inflacni-kalkulator',
    icon: '📈',
    categoryName: 'České nástroje',
    categoryPath: '/ceske-nastroje',
    enabled: true,
    featured: null,
  },
]
