/**
 * In-memory email marketing store helpers (shared by memory + file).
 */

import {
  createCampaignId,
  createSubscriberId,
  createUnsubscribeToken,
  isActivelyOptedIn,
  normalizeSubscriberEmail,
} from '@/lib/email/subscriber-utils';
import type {
  EmailCampaignRecord,
  EmailMarketingStore,
  EmailSubscriberRecord,
} from '@/lib/persistence/types';

export type EmailMarketingState = {
  emailSubscribers: EmailSubscriberRecord[];
  emailCampaigns: EmailCampaignRecord[];
};

export function emptyEmailMarketingState(): EmailMarketingState {
  return { emailSubscribers: [], emailCampaigns: [] };
}

export function createEmailMarketingApi(
  getState: () => EmailMarketingState,
  persist?: (state: EmailMarketingState) => void,
): EmailMarketingStore {
  const save = (state: EmailMarketingState) => {
    persist?.(state);
  };

  return {
    async upsertMarketingSubscriber(input) {
      if (!input.marketingOptIn) return null;
      const email = normalizeSubscriberEmail(input.email);
      if (!email.includes('@')) return null;
      const state = getState();
      const now = new Date().toISOString();
      const existing = state.emailSubscribers.find((s) => s.email === email);
      if (existing) {
        existing.marketingOptIn = true;
        existing.optedInAt = existing.optedInAt ?? now;
        existing.unsubscribedAt = null;
        existing.updatedAt = now;
        if (!existing.unsubscribeToken) existing.unsubscribeToken = createUnsubscribeToken();
        save(state);
        return { ...existing };
      }
      const record: EmailSubscriberRecord = {
        id: createSubscriberId(),
        email,
        source: 'checkout',
        marketingOptIn: true,
        optedInAt: now,
        unsubscribedAt: null,
        unsubscribeToken: createUnsubscribeToken(),
        createdAt: now,
        updatedAt: now,
      };
      state.emailSubscribers.push(record);
      save(state);
      return { ...record };
    },
    async listOptedInSubscribers() {
      return getState()
        .emailSubscribers.filter(isActivelyOptedIn)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((s) => ({ ...s }));
    },
    async countOptedInSubscribers() {
      return getState().emailSubscribers.filter(isActivelyOptedIn).length;
    },
    async getSubscriberByUnsubscribeToken(token) {
      const found = getState().emailSubscribers.find((s) => s.unsubscribeToken === token);
      return found ? { ...found } : null;
    },
    async unsubscribeByToken(token) {
      const state = getState();
      const found = state.emailSubscribers.find((s) => s.unsubscribeToken === token);
      if (!found) return null;
      const now = new Date().toISOString();
      found.marketingOptIn = false;
      found.unsubscribedAt = now;
      found.updatedAt = now;
      save(state);
      return { ...found };
    },
    async saveEmailCampaign(campaign) {
      const state = getState();
      const withId = {
        ...campaign,
        id: campaign.id || createCampaignId(),
      };
      state.emailCampaigns.unshift(withId);
      if (state.emailCampaigns.length > 100) state.emailCampaigns = state.emailCampaigns.slice(0, 100);
      save(state);
      return { ...withId };
    },
    async listEmailCampaigns(limit = 20) {
      return getState()
        .emailCampaigns.slice(0, limit)
        .map((c) => ({ ...c }));
    },
  };
}
