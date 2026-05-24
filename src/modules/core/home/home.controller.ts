import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { tools } from '../../../shared/data/tools.js'

export const getMain = catchAsync(async (_req, res) => {
  res.render('pages/core/home', {
    ...buildSeoMeta({
      title: 'Bezplatné české online nástroje',
      description:
        'Více než 60 bezplatných nástrojů pro práci s textem, převody jednotek a dalšími daty. Zdarma, bez registrace.',
      path: '/',
    }),
    // featured is number | null — filter removes nulls, sort uses ! safely after that
    tools: tools
      .filter((t) => t.featured)
      .sort((a, b) => a.featured! - b.featured!)
      .slice(0, 6),
  })
})

// Všechny nástroje page
export const getAllTools = catchAsync(async (_req, res) => {
  const enabledTools = tools.filter((t) => t.enabled)
  const groupedTools = enabledTools.reduce<Record<string, typeof tools>>((acc, tool) => {
    if (!acc[tool.categoryName]) acc[tool.categoryName] = []
    acc[tool.categoryName].push(tool)
    return acc
  }, {})

  res.render('pages/core/vsechny-nastroje', {
    ...buildSeoMeta({
      title: 'Všechny nástroje',
      description:
        'Bezplatné online nástroje pro česká data. Inflační kalkulačka, rodné číslo, svátky a další.',
      path: '/vsechny-nastroje',
    }),
    tools: groupedTools,
  })
})

export const getFAQ = catchAsync(async (_req, res) => {
  res.render('pages/core/info/faq', {
    ...buildSeoMeta({
      title: 'Často kladené otázky', //TODO: Get better text
      description: 'Nejčastěji kladené otázky',
      path: '/faq',
    }),
  })
})
