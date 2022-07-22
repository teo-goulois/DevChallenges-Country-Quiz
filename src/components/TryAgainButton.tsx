import React from 'react'

type Props = {
  tryAgain: () => void
}

const TryAgainButton = ({ tryAgain}: Props) => {
  return (
    <button onClick={() => tryAgain()} className='rounded-xl border-2 border-dark-blue px-8 py-2 text-lg font-semibold'>
      Try again
    </button>
  )
}

export default TryAgainButton