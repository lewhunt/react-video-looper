import React from 'react'
import { render } from '@testing-library/react'
import VideoLooper from '../src'

describe("VideoLooper", () => {

  test("exists", () => {
    expect(VideoLooper).toBeDefined()
  })

  test('matches Snapshot', async () => {
    const { container } = render(<VideoLooper source='sample.mp4' start={4.31} end={9.48} muted={false} />)
    expect(container).toMatchSnapshot()
  })

  test('contains video element', async () => {
    const { container } = render(<VideoLooper source='sample.mp4' start={4.31} end={9.48} muted={false} />)
    expect(container.querySelector('video')).toBeInTheDocument()
  })

  test('debug view contains header text', async () => {
    const { getAllByText } = render(<VideoLooper source='sample.mp4' start={4.31} end={9.48} isDebugMode={true} muted={false} />)
    expect(getAllByText('main video')).toBeDefined()
  })

});