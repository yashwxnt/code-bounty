import Heading from '@/components/work/Heading';
import React from 'react';

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="ai-assistant-layout">
      <Heading>AI Assistant</Heading>
      <div className="ai-assistant-content">
        {children}
      </div>
    </div>
  );
}