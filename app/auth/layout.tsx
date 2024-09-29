// AuthLayout.tsx

import React from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import Welcome from '@/components/auth/welcome';


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen overflow-hidden flex justify-center items-center">
      {/* <ParticlesBackground /> */}
      <div className={`w-3/4 h-full relative flex justify-center items-center`}>
        <Welcome />
        <div className={`w-full z-2 inset-0 flex flex-col items-center justify-center `}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;