const { MemoryCache } = require("memory-cache-node");

// Cache for 10 minutes
const CACHE_DURATION = 10 * 60 * 1000;
const MAX_CACHE_SIZE = 1000000;
const CACHE_KEY = "candidatesWithApplications";

const cache = new MemoryCache(CACHE_DURATION, MAX_CACHE_SIZE);

function hasCachedData() {
  return cache.hasItem(CACHE_KEY);
}

function getCachedData() {
  return cache.retrieveItemValue(CACHE_KEY);
}

function storeData(data) {
  cache.storeExpiringItem(CACHE_KEY, data, CACHE_DURATION);
}

function clearCache() {
  cache.clear();
}

module.exports = {
  hasCachedData,
  getCachedData,
  storeData,
  clearCache,
};
