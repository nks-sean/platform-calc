import { useState } from 'react';
import ShopeeCalculator from './components/ShopeeCalculator';
import TikTokCalculator from './components/TikTokCalculator';

function App() {
  const [activeTab, setActiveTab] = useState<'shopee' | 'tiktok'>('shopee');

  return (
    <div>
      <div className="header-tabs">
        <button
          className={activeTab === 'shopee' ? 'active' : ''}
          onClick={() => setActiveTab('shopee')}
        >
          Shopee Calculator
        </button>
        <button
          className={activeTab === 'tiktok' ? 'active' : ''}
          onClick={() => setActiveTab('tiktok')}
        >
          TikTok Calculator
        </button>
      </div>

      <div className="content">
        {activeTab === 'shopee' && <ShopeeCalculator />}
        {activeTab === 'tiktok' && <TikTokCalculator />}
      </div>
    </div>
  )
}

export default App
