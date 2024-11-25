import React from 'react'
import ChallengePage from './components/challange'
import LobbyCreationPage from './components/multplayer-lobby/lobby-creation'

function layout() {
  return (
    <div>
      <LobbyCreationPage/>
       <ChallengePage/>
    </div>
  )
}

export default layout