const AuthorTag = ({ isDarkMode }) => (
    <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-start opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default">
        <span className={`text-[10px] font-mono tracking-[0.3em] uppercase 
      ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
            Developed_By
        </span>
        <span className={`font-black text-xs tracking-widest uppercase 
      ${isDarkMode ? 'text-white' : 'text-black'}`}>
            timaa
        </span>
    </div>
);

export default AuthorTag;