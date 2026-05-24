import type { FaqItem } from '../../../../shared/types/faq.js'
import { aiTransparencyFaq } from '../../../../shared/data/faq.js'

export const prevodVelikostiZnakuFaq: FaqItem[] = [
  {
    question: 'K čemu slouží převodník velikosti znaků?',
    answer:
      'Převodník umožňuje rychle změnit velikost písmen v textu — například převést celý text na velká písmena, malá písmena, titulková písmena nebo větný zápis. Hodí se při úpravě nadpisů, seznamů nebo textů zkopírovaných z jiných zdrojů.',
  },
  {
    question: 'Jaký je rozdíl mezi větným zápisem a capital case?',
    answer:
      'Větný zápis (sentence case) píše velké písmeno pouze na začátku každé věty, tedy stejně jako v běžném textu. Titulková písmena (capital case) píší velké písmeno na začátku každého slova, což se používá například v anglických nadpisech.',
  },
  {
    question: 'Funguje nástroj s češtinou a diakritikou?',
    answer:
      'Ano, nástroj plně podporuje českou diakritiku včetně znaků jako á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž. Podporuje také azbuku, arabštinu a další světová písma.',
  },
  {
    question: 'Jsou moje data někam odesílána nebo ukládána?',
    answer:
      'Ne. Převod probíhá přímo ve vašem prohlížeči bez odesílání dat na server. Pokud máte vypnutý JavaScript, text je zpracován na serveru a okamžitě zahozen (není nikam ukládán ani sdílen).',
  },
  {
    question: 'Jak dlouhý text mohu převést?',
    answer:
      'Nástroj zvládne texty až do délky 300 000 znaků, což odpovídá přibližně 166 normostranám. Pro běžné použití jako úprava nadpisů, e-mailů nebo článků je tento limit více než dostačující.',
  },
  aiTransparencyFaq,
]
