import dates from '@/dates/DateFormatter'

describe('DateFormatter format', () => {
  it('given 1520241836860 as epoch, then 5/3/2018 10:23 should be return', () => {
    const epoch = 1520241836860
    const value = dates.format(epoch)
    expect(value).to.equal('5/3/2018 10:23')
  })

  it('given 1519736960090 as epoch, then 27/2/2018 14:9 should be return', () => {
    const epoch = 1519736960090
    const value = dates.format(epoch)
    expect(value).to.equal('27/2/2018 14:9')
  })
})

describe('DateFormatter secondsToMinutes', () => {
  it('given 60 seconds, then 1 minute should be return', () => {
    const seconds = 60
    const value = dates.secondsToMinutes(seconds)
    expect(value).to.equal('1.00')
  })

  it('given 80 seconds, then 1 minute should be return', () => {
    const seconds = 80
    const value = dates.secondsToMinutes(seconds)
    expect(value).to.equal('1.33')
  })
})

describe('DateFormatter formatTime', () => {
  it('given 60 seconds, then 1m should be return', () => {
    const seconds = 60
    const value = dates.formatTime(seconds)
    expect(value).to.equal('1m')
  })

  it('given 3600 seconds, then 1h should be return', () => {
    const seconds = 3600
    const value = dates.formatTime(seconds)
    expect(value).to.equal('1h')
  })

  it('given 122 seconds, then 2m 2s should be return', () => {
    const seconds = 122
    const value = dates.formatTime(seconds)
    expect(value).to.equal('2m 2s')
  })

  it('given 0 seconds, then empty string should be return', () => {
    const seconds = 0
    const value = dates.formatTime(seconds)
    expect(value).to.equal('')
  })
})
