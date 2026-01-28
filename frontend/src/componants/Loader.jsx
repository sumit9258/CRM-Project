export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#3B252C] font-sans">
      
      {/* --- Main Animation Container --- */}
      <div className="relative flex flex-col items-center gap-8">
        
        {/* 1. Abstract Brand Icon (Geometric Wave) */}
        {/* Ye stable feel deta hai, unlike spinning circles */}
        <div className="flex items-end gap-1.5 h-12">
          <div className="w-1.5 bg-[#E3E4DB] rounded-sm animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 bg-[#8F6593] rounded-sm animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '150ms', height: '60%' }}></div>
          <div className="w-1.5 bg-[#AEA4BF] rounded-sm animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '300ms', height: '80%' }}></div>
          <div className="w-1.5 bg-[#E3E4DB] rounded-sm animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '450ms' }}></div>
        </div>

        {/* 2. Text & Status */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[#E3E4DB] text-sm font-semibold tracking-[0.2em] uppercase">
            Loading Assets
          </h2>
          <p className="text-[#AEA4BF] text-xs font-light tracking-wide opacity-80">
            Please wait while we set things up
          </p>
        </div>

        {/* 3. The "Premium" Progress Bar */}
        {/* Bahut patli aur clean line, with a glowing head */}
        <div className="w-64 h-[2px] bg-[#E3E4DB]/10 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#8F6593] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          
          {/* Solid fill following the shimmer */}
          <div className="absolute top-0 left-0 h-full bg-[#E3E4DB] animate-[progress_2s_ease-in-out_infinite] w-0"></div>
        </div>

      </div>

      {/* --- Keyframes Styles --- */}
      <style>{`
        @keyframes wave {
          0%, 100% { height: 20%; opacity: 0.5; }
          50% { height: 100%; opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes progress {
            0% { width: 0%; opacity: 1; }
            50% { width: 70%; opacity: 1; }
            100% { width: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}