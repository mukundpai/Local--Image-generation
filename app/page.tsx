'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import GenerateView from '@/components/GenerateView';
import GalleryView from '@/components/GalleryView';
import HistoryView from '@/components/HistoryView';
import SettingsView from '@/components/SettingsView';
import AnimatedBackground from '@/components/AnimatedBackground';

type View = 'generate' | 'gallery' | 'history' | 'settings';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('generate');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check connection to Fooocus backend
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch('http://127.0.0.1:7865/');
      setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'generate':
        return <GenerateView />;
      case 'gallery':
        return <GalleryView />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView onConnectionTest={checkConnection} />;
      default:
        return <GenerateView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AnimatedBackground />

      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isConnected={isConnected}
      />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
