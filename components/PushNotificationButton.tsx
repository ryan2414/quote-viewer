'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const PUSH_TOKEN_KEY = 'qv-push-auth-token';
const PUSH_ENDPOINT_KEY = 'qv-push-endpoint';

function urlBase64ToArrayBuffer(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; i++) view[i] = rawData.charCodeAt(i);
  return buffer;
}

type PermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export default function PushNotificationButton() {
  const t = useTranslations('footer');
  const [permission, setPermission] = useState<PermissionState>('default');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!('Notification' in window) || !('serviceWorker' in navigator) || !VAPID_PUBLIC_KEY) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission as PermissionState);
  }, []);

  const handleSubscribe = async () => {
    if (!VAPID_PUBLIC_KEY || !('serviceWorker' in navigator)) return;
    setIsLoading(true);
    try {
      const result = await Notification.requestPermission();
      if (result !== 'granted') {
        setPermission('denied');
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY),
      });

      const res = await fetch('/api/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription.toJSON()),
      });

      if (res.ok) {
        const { authToken } = await res.json() as { authToken: string };
        localStorage.setItem(PUSH_TOKEN_KEY, authToken);
        localStorage.setItem(PUSH_ENDPOINT_KEY, subscription.endpoint);
      }

      setPermission('granted');
    } catch {
      // 구독 실패 무시
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!('serviceWorker' in navigator)) return;
    setIsLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        const authToken = localStorage.getItem(PUSH_TOKEN_KEY);
        await fetch('/api/push', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint, authToken }),
        });
        await subscription.unsubscribe();
        localStorage.removeItem(PUSH_TOKEN_KEY);
        localStorage.removeItem(PUSH_ENDPOINT_KEY);
      }
      setPermission('default');
    } catch {
      // 해제 실패 무시
    } finally {
      setIsLoading(false);
    }
  };

  if (permission === 'unsupported' || !VAPID_PUBLIC_KEY) return null;

  if (permission === 'denied') {
    return (
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {t('pushDenied')}
      </p>
    );
  }

  return permission === 'granted' ? (
    <button
      onClick={handleUnsubscribe}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium transition-colors disabled:opacity-60"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {t('pushEnabled')}
    </button>
  ) : (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-60"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {isLoading ? t('pushProcessing') : t('pushAlerts')}
    </button>
  );
}
