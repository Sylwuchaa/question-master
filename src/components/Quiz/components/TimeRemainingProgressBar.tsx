import React, { useRef } from 'react'
import styled from 'styled-components'

const Progress = styled.progress`
  margin-bottom: 0;
  height: 2rem;
`

type Props = {
    millisecondsRemaining: number;
    max: string;
    color: string;
}

export const TimeRemainingProgressBar: React.FC<Props> = ({ millisecondsRemaining, max, color }) => {

    const progressBarRef = useRef<HTMLProgressElement>(null)
  return (
    <Progress
      ref={progressBarRef}
      className={`progress ${color} is-large`}
      value={millisecondsRemaining}
      max={max}
    />
  )
}
