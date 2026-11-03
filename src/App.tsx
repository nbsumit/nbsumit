import React from 'react';

export const App: React.FC = () => {
  return (
    <main
      className="fixed inset-0 w-screen h-screen h-[100dvh] flex items-center justify-center bg-[#09090B] overflow-hidden select-none m-0 p-0"
      aria-label="nbsumit"
    >
      <img
        src="/nb-brand.png"
        alt="NB"
        width={144}
        height={144}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain pointer-events-none animate-logo-entrance select-none"
        draggable={false}
      />
    </main>
  );
};

export default App;
