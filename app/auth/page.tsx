import React from 'react'
import Ai_assistant from './components/ai_assistant'


function Assistant() {
    return (
        <div className="ai-assistant-page">
          <Ai_assistant onNavigate={function (section: string): void {
                throw new Error('Function not implemented.');
            } } />
        </div>
      );
    }
export default Assistant