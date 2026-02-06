export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-frame-base text-bone/80 py-16 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl tracking-widest text-white">SHAKYA</h3>
          <p className="font-sans text-xs tracking-wide opacity-60 max-w-xs leading-relaxed">
            Curating the finest Himalayan heritage since 1998. 
            Preserving history, one artifact at a time.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-micro text-accent/50">Explore</h4>
          <ul className="space-y-2 font-serif text-lg text-bone/70">
            <li><a href="#" className="hover:text-white transition-colors">The Collection</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About the Family</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Private Viewing</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4 text-right md:text-left">
          <h4 className="font-sans text-xs uppercase tracking-micro text-accent/50">Contact</h4>
          <p className="font-serif text-lg opacity-70">Kathmandu, Nepal</p>
          <p className="font-sans text-xs opacity-50 tracking-widest">INFO@SHAKYAGALLERY.COM</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-micro opacity-40">
        <p>&copy; {currentYear} Shakya Gallery. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}