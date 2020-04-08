import React, { useRef } from 'react'

type Props = {
    millisecondsRemaining: number;
    max: string;
}

export const TimeRemainingProgressBar: React.FC<Props> = ({millisecondsRemaining, max}) => {

    const progressBarRef = useRef<HTMLProgressElement>(null)
  return (
    <progress
      ref={progressBarRef}
      className="progress is-danger is-large"
      value={millisecondsRemaining}
      max={max}
    />
  )
}
