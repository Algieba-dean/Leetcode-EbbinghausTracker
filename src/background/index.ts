// Background Service Worker for Manifest V3

const STORAGE_KEY_PROBLEMS = 'lc_ebbinghaus_problems';

function getTodayString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function updateBadge(): Promise<void> {
  try {
    const data = await chrome.storage.local.get([STORAGE_KEY_PROBLEMS]);
    const problems = data[STORAGE_KEY_PROBLEMS] || [];
    const today = getTodayString();

    let dueCount = 0;
    for (const p of problems) {
      if (p.nextReviewDate <= today && p.lastReviewedDate !== today) {
        dueCount += 1;
      }
    }

    if (dueCount > 0) {
      await chrome.action.setBadgeText({ text: String(dueCount) });
      await chrome.action.setBadgeBackgroundColor({ color: '#ef4444' }); // Red badge for attention
    } else {
      await chrome.action.setBadgeText({ text: '' });
      await chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
    }
  } catch (err) {
    console.error('Failed to update badge:', err);
  }
}

// Service worker lifecycle
chrome.runtime.onInstalled.addListener(() => {
  // Set up periodic alarm for checking due problems (every 30 minutes)
  chrome.alarms.create('ebbinghaus-badge-refresh', {
    periodInMinutes: 30,
  });
  updateBadge();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'ebbinghaus-badge-refresh') {
    updateBadge();
  }
});

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'UPDATE_BADGE') {
    updateBadge();
    sendResponse({ success: true });
  }
});
