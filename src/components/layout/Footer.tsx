export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void/80 mt-20 py-8">
      <div className="max-w-screen-xl mx-auto px-4 text-center space-y-2">
        <p className="text-sm font-semibold">
          <span className="text-neon-pink">Otaku</span>
          <span className="text-white">Forge</span>
        </p>
        <p className="text-xs text-gray-600">
          Built with ❤️ using React + Vite + Tailwind CSS
        </p>
        <p className="text-xs text-gray-700 font-mono">
          ポートフォリオ · Portfolio Showcase
        </p>
      </div>
    </footer>
  );
}
