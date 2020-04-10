import React, { useRef } from 'react'
import styled from 'styled-components'

const Progress = styled.progress`
  margin-bottom: 0;
  height: 2rem;
`

type Props = {
    millisecondsRemaining: number;
    max: string;
}

export const TimeRemainingProgressBar: React.FC<Props> = ({ millisecondsRemaining, max }) => {

    const progressBarRef = useRef<HTMLProgressElement>(null)
  return (
    <Progress
      ref={progressBarRef}
      className="progress is-danger is-large"
      value={millisecondsRemaining}
      max={max}
    />
  )
}
