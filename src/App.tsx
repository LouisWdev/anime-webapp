import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { DetailPage } from './pages/DetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { TrendingPage } from './pages/TrendingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="anime/:id" element={<DetailPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="trending" element={<TrendingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}