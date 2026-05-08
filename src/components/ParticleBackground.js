export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Light background with subtle blue radial glow */}
      <div 
        className="absolute inset-0 bg-[#FFFFFF]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)'
        }}
      />
      
      {/* Refined subtle grid pattern for light mode */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 90%)'
        }}
      />
    </div>
  );
}
