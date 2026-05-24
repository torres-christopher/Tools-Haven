import { catchAsync } from '../../../shared/utils/catchAsync.js'

export const getHealth = catchAsync(async (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})
